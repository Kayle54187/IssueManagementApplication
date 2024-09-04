import { IIssueResponse } from "@/types/issue";
import { useQuery } from "@tanstack/react-query";
import { baseInstance } from "../axios";

export function useGetAllIssues() {
	return useQuery<IIssueResponse[]>({
		queryKey: ["issues"],
		queryFn: () => baseInstance.get("/issues").then((res) => res.data),
	});
}

export function useGetAllIssuesById(id: string) {
	return useQuery<IIssueResponse>({
		queryKey: ["issues", id],
		queryFn: () =>
			baseInstance.get(`/issues/${id}`).then((res) => res.data),
	});
}
