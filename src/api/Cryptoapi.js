import { useState, useEffect } from "react";
import { debounce } from "lodash";
import {Card, Col, Row, Container} from "react-bootstrap"
// import { Link } from "react-router-dom";
// import CryptoGraph from "../componets/Cryptograph";

export default function SearchResults({ searchValue }) {
//   const [selectedCrypto, setSelectedCrypto] = useState(null)
  const [cryptoData, setCryptoData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        setCryptoData(data);
        console.log("Fetched cryptoData:", data);
      } catch (err) {
        console.log(err);
      }
    };

    const debouncedFetchData = debounce(fetchData, 1000);

    debouncedFetchData(); // Call the debounced fetchData function

    return () => {
      debouncedFetchData.cancel(); // Cancel the debounced fetchData function if the component is unmounted or searchValue changes
    };
  }, [searchValue]);

  let filteredCryptoData = [];
  if (cryptoData.length > 0 && searchValue) {
    filteredCryptoData = cryptoData.filter((crypto) => {
      return (
        crypto.symbol &&
        crypto.name &&
        (crypto.symbol.toLowerCase().includes(searchValue.toLowerCase()) ||
          crypto.name.toLowerCase().includes(searchValue.toLowerCase()))
      );
    });
  }

  return (
    <Container>
    <Row xs={2} lg={5}>
        {filteredCryptoData.map((crypto) => (
        <Col key={crypto.id}>
            <Card className="mt-3">
            <Card.Body>
                <Card.Title>{crypto.name}</Card.Title>
                <Card.Img src={crypto.image} variant="top"/>
                <Card.Text>Symbol: {crypto.symbol}</Card.Text>
                <Card.Text>Current Price: ${crypto.current_price}</Card.Text>
                <Card.Text>Market Cap: ${crypto.market_cap}</Card.Text>
                {/* <Link to={`/graph/${crypto.id}`}>View Graph </Link> */}
            </Card.Body>
            </Card>
        </Col>
        ))}
    </Row>
    </Container>
  );
}
