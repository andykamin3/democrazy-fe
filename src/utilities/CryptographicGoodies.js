const BigInteger = require("jsbn").BigInteger;
const crypto = require("crypto");

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// PUBLIC PARAMETERS
var p = new BigInteger("142950481577612897377251366207350601085193026787763232208511322259955075211826388565191137969675785957228922178875744018870301928203434246727650650452188476517559379655516949015006180412307375960073546778478575555767086902406147563214485604901264760329721957156402926704404814419844454185694597535438114709207");
var q = new BigInteger("71475240788806448688625683103675300542596513393881616104255661129977537605913194282595568984837892978614461089437872009435150964101717123363825325226094238258779689827758474507503090206153687980036773389239287777883543451203073781607242802450632380164860978578201463352202407209922227092847298767719057354057");
var q_prev = q.subtract(new BigInteger("1"));
var g = new BigInteger("5");
// SECRET KEY 0x8d02247150dfb3d4c9d99386ea3cbda111f8371e32d2d1d0742595743b41dd5a61e616a79e5435300e3cde58fbeb5b9c973a072543f2b90d60f8c9d812d81ef91c
// 114657974528123694612147966371279437332923305226883726197481693350496790712568019779140637028766435713572614023020929881877163770417476473285515851854581547525003518261301387624360624288169515808483402741662250060565917774910196428500826296269603759809806999812203671371623816567138286953062317431426458521341,75312002982134458232636229374233243984878958975507299080628876469637398052639178107552343344498818787003298887472203627916545302959704894421189452044081264274912264105981611898869626472434238728062774197547948826823687084443904497600820120072933130194901208680710923511303861090770831378524110546944809366026,0,0,0,0,0,0,0,0
// ==========================================
//,,0,0,0,0,0,0,0,0
// private parameters
var secret_key = new BigInteger("2380831451759006579882553120960984113277981577916531573623778541891671800956226624640322916414543030985934711395325938960305715079214976582052109890021687068");
export function generate_pk(sk) {
  let pk = g.modPow(new BigInteger(sk), p);
  console.log(`SK: ${sk} || PK: ${pk}`)
  return pk
}
// ==========================================

export async function getRandomBigIntAsync(min, max) {
  const range = max.subtract(min).subtract(BigInteger.ONE);

  let bi;
  do {
    // Generate random bytes with the length of the range
    const buf = await crypto.randomBytes(Math.ceil(range.bitLength() / 8));

    // Offset the result by the minimum value
    bi = new BigInteger(buf.toString("hex"), 16).add(min);
  } while (bi.compareTo(max) >= 0);

  // Return the result which satisfies the given range
  return bi;
}

var pk = generate_pk(secret_key);

export function customHash(values) {
  let h = new BigInteger("0");
  for (let i = 0; i < values.length; i++) {
    h = h
      .add(new BigInteger("10").pow(i))
      .multiply(values[i])
      .mod(q)
      .mod(q);
  }
  return h;
}

export function valid_vote_proof(pk, v, a, b, r) {
  let a0, a1, b0, b1, c0, c1, r0, r1;
  let c;

  if (v === 0) {
    c1 = new BigInteger(random(0, q - 1).toString());
    r0 = new BigInteger(random(0, q - 1).toString());
    r1 = new BigInteger(random(0, q - 1).toString());

    a1 = g.modPow(r1, p).multiply(new BigInteger(a).modPow(new BigInteger(c1).multiply(p.subtract(2)), p)); //(pow(g, r1, p) * pow(a, c1 * (p - 2), p)) % p;
    b1 = pk.modPow(r1, p).multiply(
      b
        .pow(g, p.subtract(2), p)
        .mod(p)
        .modPow(c1.multiply(p.subtract(2), p))
    );
    a0 = g.modPow(r0, p);
    b0 = pk.modPow(r0, p);
    c = customHash([pk, a, b, a0, b0, a1, b1]);
    c0 = c1.subtract(c).abs();

    c0 = q.add(c1.subtract(c).mod(q)).mod(q);

    r0 = r0.add(c0.multiply(r).mod(q)).mod(q);

    return [a0, a1, b0, b1, c0, c1, r0, r1];
  } else if (v === 1) {
    c0 = new BigInteger(random(0, q - 1).toString());
    r0 = new BigInteger(random(0, q - 1).toString());
    r1 = new BigInteger(random(0, q - 1).toString());
    a0 = g
      .modPow(r0, p)
      .multiply(a.modPow(c0.multiply(p.subtract(2))), p)
      .mod(p);
    b0 = pk
      .modPow(r0, p)
      .multiply(b.modPow(c0.multiply(p.subtract(2))), p)
      .mod(p);
    a1 = g.modPow(r1, p);
    b1 = pk.modPow(r1, p);
    c = customHash([pk, a, b, a0, b0, a1, b1]);
    c1 = c0.subtract(c).abs();
    c1 = q.add(c0.subtract(c).mod(q)).mod(q);
    r1 = r1.add(c1.multiply(r).mod(q)).mod(q);
    return [a0, a1, b0, b1, c0, c1, r0, r1];
  } else {
    return [0, 0, 0, 0, 0, 0, 0, 0];
  }
}

export async function encrypt(vote, pk) {
  const r = await getRandomBigIntAsync(new BigInteger("3"), q_prev);
  const a = g.modPow(r, p);
  const b = g
    .modPow(new BigInteger(vote.toString()), p)
    .multiply(pk.modPow(r, p))
    .mod(p);
  const proof = valid_vote_proof(pk, vote, a, b, r);
  return [a, b, proof];
}

export function decrypt(sk, a, b) {
  const ai = a.modPow(sk.multiply(p.subtract(new BigInteger("2"))), p);
  const gm = b.multiply(ai).mod(p);
  let m = new BigInteger("0");
  while (g.modPow(m, p).compareTo(gm) !== 0) {
    m = m.add(new BigInteger("1"));
  }
  return m;
}
