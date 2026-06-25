type ProfileInfoCardProps = {
  title: string;
  items: Array<{ label: string; value: string }>;
};

export default function ProfileInfoCard({ title, items }: ProfileInfoCardProps) {
  return (
    <div className="bg-snow rounded-2xl border border-border p-6 shadow-sm">
      <h2 className="text-ink text-h3 mb-4">{title}</h2>
      <div className="grid gap-4">
        {items.map(item => (
          <div key={item.label} className="flex flex-col gap-1">
            <span className="text-slate text-p3">{item.label}</span>
            <span className="text-ink text-p2">{item.value || '—'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
