import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import generateId from "../helpers/generateId";

interface IPatient {
  id?: string;
  pet: string;
  owner: string;
  email: string;
  date: string;
  symptoms: string;
}

interface IError {
  state: boolean;
  message: string;
}

interface Props {
  patients: IPatient[];
  setPatients: React.Dispatch<React.SetStateAction<IPatient[]>>;
  patient: IPatient;
  setPatient: React.Dispatch<React.SetStateAction<IPatient>>;
}

const INITIAL_VALUES: IPatient = {
  id: "",
  pet: "",
  owner: "",
  email: "",
  date: "",
  symptoms: ""
}

export const Form = ({ patients, setPatients, patient, setPatient }: Props) => {

  const inputName = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState<IError>({
    state: false,
    message: ""
  });
  const [dataForm, setDataForm] = useState<IPatient>(INITIAL_VALUES);

  useEffect(() => {
    setDataForm(patient);
    inputName.current?.focus();
  }, [patient])
  

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(dataForm.pet === "") {
      setError({
        state: true,
        message: "El nombre de la mascota es obligatorio"
      });
      setTimeout(() => {
        setError({ state: false, message: ""});
      }, 3000);
      return;
    }

    if(dataForm.owner === "") {
      setError({
        state: true,
        message: "El nombre del propietario es obligatorio"
      });
      setTimeout(() => {
        setError({ state: false, message: ""});
      }, 3000);
      return;
    }

    if(dataForm.email === "") {
      setError({
        state: true,
        message: "El correo electrónico es obligatorio"
      });
      setTimeout(() => {
        setError({ state: false, message: ""});
      }, 3000);
      return;
    }

    if(dataForm.date === "") {
      setError({
        state: true,
        message: "La fecha de alta es obligatoria"
      });
      setTimeout(() => {
        setError({ state: false, message: ""});
      }, 3000);
      return;
    }

    if(dataForm.symptoms === "") {
      setError({
        state: true,
        message: "Los síntomas son obligatorios"
      });
      setTimeout(() => {
        setError({ state: false, message: ""});
      }, 3000);
      return;
    }

    const newPatient:IPatient = {
      pet: dataForm.pet,
      owner: dataForm.owner,
      email: dataForm.email,
      date: dataForm.date,
      symptoms: dataForm.symptoms
    }

    if(patient.id) {
      newPatient.id = patient.id;
      const patientUpdate = patients.map(patientState => patientState.id === patient.id ? newPatient : patientState);
      setPatients(patientUpdate);
      setPatient(INITIAL_VALUES);
    } else {
      newPatient.id = generateId();
      setPatients([...patients, newPatient]);
    }
    
    setDataForm(INITIAL_VALUES);
  }

  return (
    <section className="max-w-xl w-full py-10 px-4 md-px-10 bg-white rounded-xl mb-10">
      <h2 className="text-zinc-800 text-2xl font-semibold text-center lg:text-left">Seguimiento de pacientes</h2>
      <p className="text-zinc-600 text-center lg:text-left mt-2">Añade pacientes y <span className="text-indigo-500 font-bold">administralos</span></p>
      <form
        className="mt-10"
        onSubmit={handleSubmit}
      >
        <section className="mb-6">
          <label
            htmlFor="pet"
            className="text-zinc-600 font-semibold block mb-2"
          >Nombre de mascota</label>
          <input
            ref={inputName}
            id="pet"
            name="pet"
            type="text"
            placeholder="Ej: Firulay"
            autoFocus
            value={dataForm.pet}
            onChange={handleChange}
            className="border border-zinc-200 px-4 py-2 w-full rounded-lg outline outline-2 -outline-offset-2 outline-transparent focus:outline-indigo-500"
          />
        </section>
        <section className="mb-6">
          <label
            htmlFor="owner"
            className="text-zinc-600 font-semibold block mb-2"
          >Nombre del propietario</label>
          <input
            id="owner"
            name="owner"
            type="text"
            placeholder="Ej: Juan David"
            value={dataForm.owner}
            onChange={handleChange}
            className="border border-zinc-200 px-4 py-2 w-full rounded-lg outline outline-2 -outline-offset-2 outline-transparent focus:outline-indigo-500"
          />
        </section>
        <section className="mb-6">
          <label
            htmlFor="email"
            className="text-zinc-600 font-semibold block mb-2"
          >Correo electrónico</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Ej: juandavid@gmail.com"
            value={dataForm.email}
            onChange={handleChange}
            className="border border-zinc-200 px-4 py-2 w-full rounded-lg outline outline-2 -outline-offset-2 outline-transparent focus:outline-indigo-500"
          />
        </section>
        <section className="mb-6">
          <label
            htmlFor="date"
            className="text-zinc-600 font-semibold block mb-2"
          >Fecha de alta</label>
          <input
            id="date"
            name="date"
            type="date"
            value={dataForm.date}
            onChange={handleChange}
            className="border border-zinc-200 px-4 py-2 w-full rounded-lg outline outline-2 -outline-offset-2 outline-transparent focus:outline-indigo-500"
          />
        </section>
        <section className="mb-10">
          <label
            htmlFor="symptoms"
            className="text-zinc-600 font-semibold block mb-2"
          >Síntomas</label>
          <textarea
            id="symptoms"
            name="symptoms"
            placeholder="Ej: Pasa todo el día durmiendo, no come, etc..."
            value={dataForm.symptoms}
            onChange={handleChange}
            className="border border-zinc-200 px-4 py-2 w-full rounded-lg outline outline-2 -outline-offset-2 outline-transparent focus:outline-indigo-500"
          />
        </section>
        <section className={`${error.state ? "py-2 opacity-100 scale-y-100" : "py-0 opacity-0 scale-y-0"} w-full bg-red-500 text-center text-white rounded-lg mb-6 transition-all duration-200 overflow-hidden`}>
          {error.message}
        </section>
        <section className="flex justify-center lg:justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 font-medium uppercase text-white rounded-lg"
          >{patient.id ? "Actualizar paciente" : "Agregar paciente"}</button>
        </section>
      </form>
    </section>
  )
}
