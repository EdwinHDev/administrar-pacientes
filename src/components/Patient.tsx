
interface IPatient {
  id?: string;
  pet: string;
  owner: string;
  email: string;
  date: string;
  symptoms: string;
}

interface Props {
  patientData: IPatient;
  setPatient: React.Dispatch<React.SetStateAction<IPatient>>;
  deletePatient: (id: string) => void;
}

export const Patient = ({ patientData, setPatient, deletePatient }: Props) => {

  const { id, pet, owner, email, date, symptoms } = patientData;

  const handleDeletePatient = () => {
    const deleteConfirm = confirm(`¿Deseas eliminar el paciente ${pet}?`);

    if(deleteConfirm) {
      deletePatient(id!);
    }
  }

  return (
    <article className="p-4 bg-white rounded-lg shadow-lg shadow-zinc-200 divide-y">
      <section className="flex flex-col md:flex-row gap-1 md:gap-4 py-4">
        <p className="text-zinc-800 font-semibold">Nombre de mascota:</p>
        <p className="text-zinc-500">{pet}</p>
      </section>
      <section className="flex flex-col md:flex-row gap-1 md:gap-4 py-4">
        <p className="text-zinc-800 font-semibold">Nombre del propietario:</p>
        <p className="text-zinc-500">{owner}</p>
      </section>
      <section className="flex flex-col md:flex-row gap-1 md:gap-4 py-4">
        <p className="text-zinc-800 font-semibold">Correo electrónico:</p>
        <p className="text-zinc-500">{email}</p>
      </section>
      <section className="flex flex-col md:flex-row gap-1 md:gap-4 py-4">
        <p className="text-zinc-800 font-semibold">Fecha de alta:</p>
        <p className="text-zinc-500">{date}</p>
      </section>
      <section className="flex flex-col gap-1 py-4">
        <p className="text-zinc-800 font-semibold">Síntomas:</p>
        <p className="text-zinc-500">{symptoms}</p>
      </section>
      <section className="flex justify-between gap-6 py-4">
        <button
          className="px-6 py-2 bg-red-500 hover:bg-red-600 font-medium uppercase text-white rounded-lg"
          onClick={handleDeletePatient}
        >
          Eliminar
        </button>
        <button
          className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 font-medium uppercase text-white rounded-lg"
          onClick={() => setPatient(patientData)}
        >
          Editar
        </button>
      </section>
    </article>
  )
}
