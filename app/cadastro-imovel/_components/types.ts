export type AnswerValue = string | string[] | undefined;

export type Answers = Record<string, AnswerValue>;

export type QuestionType =
  | "text"
  | "textarea"
  | "tel"
  | "email"
  | "number"
  | "currency"
  | "area"
  | "single"
  | "multi";

export type Question = {
  id: string;
  section: string;
  label: string;
  description?: string;
  type: QuestionType;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  allowOther?: boolean;
  when?: (a: Answers) => boolean;
};
