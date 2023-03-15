import { useEffect, useState } from "react";
import { PersonalInformation } from "../components/home/PersonalInformations";
import { Transaction } from "../components/home/transactions/Transaction";
import { Loader } from "../components/loader/Loader";
import { NavBar } from "../components/navBar/NavBar";

export function Home() {

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
  }, []);


  return (
    <>

      {isLoaded ?
        <>
          <NavBar />
          <main className="px-12">
            <PersonalInformation />
            <Transaction />
          </main>
        </>
        : <Loader />}

    </>
  );
}