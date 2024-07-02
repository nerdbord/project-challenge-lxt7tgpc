import AnonymousFileUpload from '@/components/AnonymousFileUpload';


export default async function Index() {
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-5">
      <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
        <AnonymousFileUpload />
      </div>
    </div>
  );
}