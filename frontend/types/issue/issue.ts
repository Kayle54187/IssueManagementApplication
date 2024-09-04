import { z } from "zod";

export const IssueSchema = z.object({
	title: z.string({
		message: "Title must be a string",
	}),
	description: z.string({
		message: "Description must be a string",
	}),
});

export type TIssueFields = z.infer<typeof IssueSchema>;
