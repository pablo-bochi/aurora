import { calculateJourneyState } from "../lib/journey-engine";
import { financialHealthMockV3 } from "./financial-health-v3";
import { auroraUserStateMock } from "./aurora-user-state";

export const journeyMock = calculateJourneyState(auroraUserStateMock, financialHealthMockV3);
