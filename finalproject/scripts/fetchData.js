
export async function fetchData(url){
    try{
      const res = await fetch(url);
      if(!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    }catch(err){
      console.error('Fetch failed:', err);
      throw err;
    }
  }
  