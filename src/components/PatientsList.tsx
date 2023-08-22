import { Patient } from "./Patient";

interface IPatient {
  id?: string;
  pet: string;
  owner: string;
  email: string;
  date: string;
  symptoms: string;
}

interface Props {
  patients: IPatient[];
  setPatient: React.Dispatch<React.SetStateAction<IPatient>>;
  deletePatient: (id: string) => void;
}

export const PatientsList = ({ patients, setPatient, deletePatient }: Props) => {
  return (
    <section className="max-w-xl w-full mb-10 lg:h-screen lg:overflow-y-scroll">
      <h2 className="text-zinc-800 text-2xl font-semibold text-center lg:text-left">Listado pacientes</h2>
      <p className="text-zinc-600 text-center lg:text-left mt-2">Administra tus <span className="text-indigo-500 font-bold">pacientes y citas</span></p>
    
      <section className="mt-10 flex flex-col gap-2">
        {
          patients.length > 0 ? (
            patients.map(patientData => (
              <Patient
                key={patientData.id}
                patientData={patientData}
                setPatient={setPatient}
                deletePatient={deletePatient}
              />
            ))
          ) : (
            <div className="flex justify-center py-4">
              <p className="text-zinc-600 text-center">No hay pacientes para mostrar</p>
            </div>
          )
        }
      </section>
    </section>
  )
}
