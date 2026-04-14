export type AssistantResponseType = "insight" | "warning" | "next_action" | "confirmation";

export type AssistantResponse = {
  id: string;
  type: AssistantResponseType;
  title: string;
  message: string;
  suggestedActions: string[];
  requiresConfirmation: boolean;
};
