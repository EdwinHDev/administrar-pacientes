import { Form } from "./components/Form"
import { Header } from "./components/Header"
import { PatientsList } from "./components/PatientsList"
import { useEffect, useState } from 'react';

interface IPatient {
  id?: string;
  pet: string;
  owner: string;
  email: string;
  date: string;
  symptoms: string;
}

const INITIAL_VALUES: IPatient = {
  id: "",
  pet: "",
  owner: "",
  email: "",
  date: "",
  symptoms: ""
}

function App() {

  const [patients, setPatients] = useState<IPatient[]>([]);
  const [patient, setPatient] = useState<IPatient>(INITIAL_VALUES);

  useEffect(() => {
    const getPatients = () => {
      const patientsList = JSON.parse(localStorage.getItem("patients")! ?? []);
      setPatients(patientsList);
    }
    getPatients();
  }, []);

  useEffect(()=> {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  const deletePatient = (id: string) => {
    const deletePacientList = patients.filter(patient => patient.id !== id);
    setPatients(deletePacientList);
  }

  return (
    <div className="container mx-auto px-4">
      <Header />
      <section className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6">
        <Form
          patients={patients}
          setPatients={setPatients}
          patient={patient}
          setPatient={setPatient}
        />
        <PatientsList
          patients={patients}
          setPatient={setPatient}
          deletePatient={deletePatient}
        />
      </section>
    </div>
  )
}

export default App
