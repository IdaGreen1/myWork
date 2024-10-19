// src/components/ApiExample.js

import React, { useState, useEffect } from 'react';

const ApiExample = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/posts');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>API Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ApiExample;
//U ovom primjeru, useEffectkuka se koristi za dohvaćanje podataka kada se komponenta montira. Funkcija fetchse koristi za upućivanje GET zahtjeva navedenoj API krajnjoj točki ( 'https://api.example.com/posts'), a odgovor se pretvara u JSON pomoću response.json().





//3.2 Izrada GET zahtjeva
//Kada radite s RESTful API-jima, GET zahtjevi su najčešći. Oni dohvaćaju podatke s poslužitelja bez da ih mijenjaju. Poboljšajmo naš primjer kako bismo uključili parametre upita i rukovali različitim aspektima GET zahtjeva.

src/components/ApiExample.js

// ... (previous imports)

const ApiExample = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState

(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating a delay to show loading state
        setTimeout(async () => {
          const response = await fetch('https://api.example.com/posts?userId=1');
          const result = await response.json();
          setData(result);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>API Data</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApiExample;
//U ovom primjeru, useEffectkuka se koristi za dohvaćanje podataka kada se komponenta montira. Funkcija fetchse koristi za upućivanje GET zahtjeva navedenoj API krajnjoj točki ( 'https://api.example.com/posts'), a odgovor se pretvara u JSON pomoću response.json().



//3.3 Rukovanje asinkronim operacijama sasync/await
//Korištenje async/awaitsintakse čini asinkroni kod čitljivijim i lakšim za rad. Omogućuje pisanje asinkronog koda koji izgleda i ponaša se slično sinkronom kodu.

// src/components/ApiExample.js

// ... (previous imports)

const ApiExample = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/posts?userId=1');
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>API Data</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApiExample;
//Ovdje fetchDataje funkcija deklarirana kao asinkrona funkcija pomoću asyncključne riječi. To omogućuje korištenje awaitunutar funkcije, čineći asinkroni kod jednostavnijim i održavajući čistu i čitljivu strukturu.



//3.4 Rješavanje pogrešaka
//Bitno je elegantno postupati s pogreškama prilikom postavljanja API zahtjeva. U prethodnim primjerima uveli smo osnovni mehanizam za obradu grešaka pomoću try/catchblokova. Proširimo ovo kako bismo pružili detaljnije poruke o pogrešci.

// src/components/ApiExample.js

// ... (previous imports)

const ApiExample = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/posts?userId=1');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching the data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>API Data</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApiExample;
//U ovom primjeru, response.oksvojstvo se provjerava kako bi se utvrdilo je li HTTP zahtjev bio uspješan. Ako nije, pojavljuje se pogreška s informacijama o HTTP statusu. Osim toga, u stanju je postavljena poruka o pogrešci koja je lakša za korištenje errori prikazuje se u komponenti.




4. Kako prikazati API podatke u React komponentama
4.1 Stanje i Props u Reactu
U Reactu komponente upravljaju svojim internim stanjem, dopuštajući im dinamičko ažuriranje i ponovno renderiranje na temelju promjena. Rekviziti se, s druge strane, koriste za prijenos podataka od roditelja do podređenih komponenti.

Shvatimo kako koristiti stanje i rekvizite za prikaz API podataka.

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayData = () => {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.example.com/data');
        setApiData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>API Data Display</h2>
      {apiData ? (
        // Render your component using the fetched data
        <MyComponent data={apiData} />
      ) : (
        // Render a loading state or placeholder
        <p>Loading...</p>
      )}
    </div>
  );
};

const MyComponent = ({ data }) => {
  return (
    <div>
      <p>{data.message}</p>
      {/* Render other components based on data */}
    </div>
  );
};

export default DisplayData;



//4.2 Ažuriranje stanja dohvaćenim podacima
//Kada se podaci uspješno dohvate iz API-ja, ažuriramo stanje komponente pomoću setApiData(response.data). To pokreće ponovno iscrtavanje, osiguravajući da korisničko sučelje odražava najnovije informacije.

//4.3 Dinamičko iscrtavanje podataka
//Prosljeđivanje podataka kao rekvizita omogućuje komponentama dinamičko renderiranje sadržaja. U primjeru MyComponentprima podatke kao potporu i renderira sadržaj na temelju tih podataka.

//4.4 Učitavanje stanja i rukovanje pogreškama
//Prikaz stanja učitavanja ( <p>Loading...</p>) dok se čekaju API podaci osigurava bolje korisničko iskustvo. Osim toga, uključili smo rukovanje pogreškama kako bismo uhvatili i zabilježili sve probleme koji se mogu pojaviti tijekom API zahtjeva.

//5. CRUD operacije s RESTful API-jima
//5.1 Stvaranje podataka (POST zahtjevi)
//Stvaranje podataka uključuje postavljanje POST zahtjeva API-ju. Implementirajmo jednostavan obrazac za dodavanje novih stavki.

import React, { useState } from 'react';
import axios from 'axios';

const CreateData = () => {
  const [newData, setNewData] = useState('');

  const handleCreate = async () => {
    try {
      await axios.post('https://api.example.com/data', { newData });
      alert('Data created successfully!');
      // Optionally, fetch and update the displayed data
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };

  return (
    <div>
      <h2>Create New Data</h2>
      <input
        type="text"
        value={newData}
        onChange={(e) => setNewData(e.target.value)}
      />
      <button onClick={handleCreate}>Create</button>
    </div>
  );
};

export default CreateData;
//U ovom primjeru hvatamo korisnički unos kukom useStatei šaljemo POST zahtjev API-ju kada se klikne gumb "Stvori".

//5.2 Čitanje podataka (GET zahtjevi)
//Čitanje podataka uključuje GET zahtjeve za dohvaćanje informacija iz API-ja. To smo već obradili u prethodnom odjeljku o prikazivanju API podataka.

//5.3 Ažuriranje podataka (PUT/PATCH zahtjevi)
//Ažuriranje podataka zahtijeva slanje zahtjeva PUT ili PATCH API-ju s izmijenjenim podacima. Kreirajmo primjer za ažuriranje postojećih podataka.

import React, { useState } from 'react';
import axios from 'axios';

const UpdateData = () => {
  const [updatedData, setUpdatedData] = useState('');

  const handleUpdate = async () => {
    try {
      await axios.put('https://api.example.com/data/1', { updatedData });
      alert('Data updated successfully!');
      // Optionally, fetch and update the displayed data
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div>
      <h2>Update Data</h2>
      <input
        type="text"
        value={updatedData}
        onChange={(e) => setUpdatedData(e.target.value)}
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default UpdateData;
//U ovom primjeru bilježimo ažurirane podatke i šaljemo PUT zahtjev krajnjoj točki API-ja za određenu stavku.