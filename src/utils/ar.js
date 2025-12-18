export function calcAR(user) {
  // base AR from offers: offer_pts * 0.01
  let ar = (user.offer_pts || 0) * 0.01;
  // penalty: if no points from offerwall, AR down by 0.1
  if (!user.offer_pts || user.offer_pts === 0) {
    ar -= 0.1;
  }
  // keep AR non-negative
  return Math.max(ar, 0);
}
