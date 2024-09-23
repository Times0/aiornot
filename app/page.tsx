import AiOrNotGame from './components/AiOrNotGame';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-background to-secondary">
      <h1 className="text-5xl font-bold text-center mb-8 text-primary cartoon-shadow">AiOrNot</h1>
      <p className="text-2xl text-center mb-12 text-foreground/80">Can you spot the AI-generated image?</p>
      <div className="cartoon-border rounded-3xl bg-card p-8 shadow-xl">
        <AiOrNotGame />
      </div>
    </main>
  );
}
