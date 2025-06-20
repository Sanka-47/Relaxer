'use client';

const affirmations = [
  "Great job taking care of yourself!",
  "You're building a healthy habit!",
  "A moment of mindfulness makes a difference.",
  "Your well-being matters.",
  "Small breaks lead to big improvements.",
  "You're doing great!",
  "Taking breaks is a sign of strength.",
  "Your mind thanks you for this pause.",
  "Mindful moments create mindful days.",
  "You're mastering the art of self-care!"
];

const quotes = [
  {
    text: "The quieter you become, the more you can hear.",
    author: "Ram Dass"
  },
  {
    text: "In today's rush, we all think too much, seek too much, want too much and forget about the joy of just being.",
    author: "Eckhart Tolle"
  },
  {
    text: "Take rest; a field that has rested gives a bountiful crop.",
    author: "Ovid"
  },
  {
    text: "Almost everything will work again if you unplug it for a few minutes, including you.",
    author: "Anne Lamott"
  },
  {
    text: "Your calm mind is the ultimate weapon against your challenges.",
    author: "Bryant McGill"
  }
];

type AffirmationType = 'affirmation' | 'quote';

type AffirmationProps = {
  type?: AffirmationType;
};

export default function Affirmation({ type = 'affirmation' }: AffirmationProps) {
  const getRandomItem = <T extends unknown>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  };

  if (type === 'quote') {
    const quote = getRandomItem(quotes);
    return (
      <div className="text-center space-y-2">
        <p className="text-xl text-white/90 italic">"{quote.text}"</p>
        <p className="text-sm text-white/70">— {quote.author}</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="text-2xl text-white/90 font-light">
        {getRandomItem(affirmations)}
      </p>
    </div>
  );
}