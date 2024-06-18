export interface Name {
    _id: string;
    name: string;
    rating: number;
    gender: string;
  }
  
  export async function fetchNames(): Promise<Name[]> {
    const res = await fetch('/api/names');
    if (!res.ok) {
      throw new Error('Failed to fetch names');
    }
    return res.json();
  }
  
  export async function rateName(id: string, rating: number): Promise<void> {
    await fetch('/api/names', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, rating }),
    });
  }
  