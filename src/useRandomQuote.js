import { useEffect, useState } from "react";


function useRandomQuote() {
    const [quote, setQuote] = useState({});

    useEffect(() => {
        const fetchQuote = async () =>
          await fetch(
            `https://type.fit/api/quotes`
            )
            .then((res) => res.json())
            .then((data) => {
              let num = Math.random() * (data.length);

              let quote = data[Math.round(num)];
              
              console.log(num + ' generated ' + quote);
              setQuote(quote);
              
            });
    
            fetchQuote();  
    }, []);

    return quote;
}

export default useRandomQuote
