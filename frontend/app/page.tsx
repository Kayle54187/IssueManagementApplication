"use client";

import Image from "next/image";
import { IssueModal } from "./_components/IssueModal";
import { useGetAllIssues } from "@/services/issues";
import { useToast } from "@/hooks/use-toast";
import { baseInstance } from "@/services/axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export default function Home() {
	const { data: issueData, isLoading } = useGetAllIssues();

	const queryClient = useQueryClient();
	const { toast } = useToast();

	const { mutate: deleteIssue, isPending } = useMutation<
		string,
		string,
		string
	>({
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["issues"] });
		},
		onError: () => {},
		mutationFn: (data) => {
			return baseInstance
				.delete(`/issues/${data}/delete`)
				.then((res) => res.data);
		},
	});

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
				<IssueModal />
				<div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
					<p className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0">
						By <p>Christian</p>
					</p>
				</div>
			</div>

			<div className="text-white">
				{isLoading ? (
					<p>Loading...</p>
				) : (
					issueData?.map((issue) => (
						<div
							key={issue.id}
							className="flex flex-col p-8 m-8 bg-blue-900 rounded-lg shadow-lg dark:bg-neutral-800"
						>
							<h2 className="text-2xl font-semibold">
								{issue.title}
							</h2>
							<p className="m-0 text-sm">{issue.description}</p>
							<button
								className="bg-red-500 my-2"
								onClick={() => deleteIssue(issue.id)}
								disabled={isPending}
							>
								Delete
							</button>
						</div>
					))
				)}
			</div>

			<div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left"></div>
		</main>
	);
}
