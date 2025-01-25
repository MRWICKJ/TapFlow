import MoneySendingPage from "@/components/Transaction";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params;
  const receiver = resolvedParams?.id;
  return(
    <MoneySendingPage receiverId={receiver} />
  );
}
