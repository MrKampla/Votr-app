export const AMOUNT_OF_SECONDS_IN_WEEK = 7 * 24 * 60 * 60;
export const INCREASE_OF_VOTING_POWER_PER_SECOND = 105629215;
export const MAX_ADDITIONAL_MULTIPLIER_VALUE = 2;
export const SECONDS_IN_WEEK = 604_800;

export function calculateMultiplierForLockupPeriod(lockupPeriodInWeeks: number): string {
  // 156 weeks = 3 years = maximum lockup period
  if (lockupPeriodInWeeks === 156) {
    return '3.00';
  }
  const lockupPeriodInSeconds = lockupPeriodInWeeks * AMOUNT_OF_SECONDS_IN_WEEK;
  return (
    (INCREASE_OF_VOTING_POWER_PER_SECOND * lockupPeriodInSeconds * MAX_ADDITIONAL_MULTIPLIER_VALUE) / 10 ** 16 +
    1
  ).toFixed(2);
}
