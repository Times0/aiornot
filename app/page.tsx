import AiOrNotGame from './components/AiOrNotGame';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-8">AiOrNot</h1>
      <p className="text-xl text-center mb-8">Can you spot the AI-generated image?</p>
      <AiOrNotGame />
    </main>
  );
}
