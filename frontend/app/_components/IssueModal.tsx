import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IssueSchema, TIssueFields } from "@/types/issue/issue";
import { useForm } from "react-hook-form";
import {
	FormControl,
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { baseInstance } from "@/services/axios";
import { useToast } from "@/hooks/use-toast";

export function IssueModal() {
	const form = useForm<TIssueFields>({
		resolver: zodResolver(IssueSchema),
	});

	const queryClient = useQueryClient();
	const { toast } = useToast();

	const { mutate: createIssue, isPending } = useMutation<
		TIssueFields,
		AxiosError,
		TIssueFields
	>({
		onSuccess: () => {
			toast({
				title: "Issue Added",
				description: "Issue was Added Successfully",
			});
			queryClient.invalidateQueries({ queryKey: ["issues"] });
		},
		onError: () => {
			toast({
				title: "Adding Issue Failed",
				description: "Error occurred while adding Issue",
				variant: "destructive",
			});
		},
		mutationFn: (data) => {
			return baseInstance.post("/issues", data).then((res) => res.data);
		},
	});

	const submitData = (data: TIssueFields) => {
		createIssue(data);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Create Issue</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create a new Issue</DialogTitle>
					<DialogDescription>
						Create a new issue with title and decription
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(submitData)}>
							<FormField
								name="title"
								control={form.control}
								render={({ field }) => (
									<FormItem className="my-4">
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name="description"
								control={form.control}
								render={({ field }) => (
									<FormItem className="my-4">
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								type="submit"
								className="w-full"
								disabled={isPending}
							>
								Add Issue
							</Button>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
}
