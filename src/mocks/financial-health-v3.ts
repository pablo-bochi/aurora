import { calculateFinancialHealthScore } from "../lib/financial-health-engine";
import { auroraUserStateMock } from "./aurora-user-state";

export const financialHealthMockV3 = calculateFinancialHealthScore(auroraUserStateMock);
