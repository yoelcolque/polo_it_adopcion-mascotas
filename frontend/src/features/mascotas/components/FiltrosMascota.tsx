import type { Filtros } from '../pages/BuscarMascotaPage';

type Props = {
    filtros: Filtros;
    onAplicar: (filtros: Filtros) => void;
    onCerrar: () => void;
};

type CheckboxGroupProps<T> = {
    label: string;
    options: { label: string; value: T }[];
    selected: T | undefined;
    onSelect: (value: T) => void;
};

const CheckboxGroup = <T,>({
                               label,
                               options,
                               selected,
                               onSelect
                           }: CheckboxGroupProps<T>) => (
    <div className="bg-[#CDEDF2] p-3 rounded">
        <label className="font-semibold">{label}</label>
        <div className="mt-2 flex flex-col gap-2">
            {options.map(({ label, value }) => (
                <label
                    key={label}
                    className="flex items-center gap-2 bg-[#B3E8F2] p-2 rounded cursor-pointer"
                >
                    <input
                        type="checkbox"
                        checked={selected === value}
                        onChange={() => onSelect(selected === value ? undefined! : value)}
                    />
                    {label}
                </label>
            ))}
        </div>
    </div>
);

const FiltroMascotas = ({ filtros, onAplicar, onCerrar }: Props) => {
    return (
        <div className="fixed inset-0 bg-white z-[9999] p-4 overflow-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-text">Filtros</h2>
                <button onClick={onCerrar}>
                    <img src="/Close.svg" alt="Cerrar" className="w-6 h-6" />
                </button>
            </div>

            <div className="space-y-4">
                <CheckboxGroup
                    label="Sexo"
                    options={[
                        { label: 'Hembra', value: 'HEMBRA' },
                        { label: 'Macho', value: 'MACHO' }
                    ]}
                    selected={filtros.sexoMascota}
                    onSelect={(value) =>
                        onAplicar({ ...filtros, sexoMascota: value })
                    }
                />

                <CheckboxGroup
                    label="Especie"
                    options={[
                        { label: 'Perro', value: 'PERRO' },
                        { label: 'Gato', value: 'GATO' }
                    ]}
                    selected={filtros.especieMascota}
                    onSelect={(value) =>
                        onAplicar({ ...filtros, especieMascota: value })
                    }
                />

                <div className="bg-[#CDEDF2] p-3 rounded">
                    <label className="font-semibold">Edad</label>
                    <div className="mt-2">
                        <input
                            type="number"
                            min={0}
                            value={filtros.edad || ''}
                            onChange={(e) =>
                                onAplicar({
                                    ...filtros,
                                    edad: e.target.value ? parseInt(e.target.value) : undefined
                                })
                            }
                            className="w-full p-2 rounded bg-[#B3E8F2] text-text"
                            placeholder="Edad exacta"
                        />
                    </div>
                </div>

                <CheckboxGroup
                    label="Vacunado"
                    options={[
                        { label: 'Sí', value: true },
                        { label: 'No', value: false }
                    ]}
                    selected={filtros.vacunado}
                    onSelect={(value) =>
                        onAplicar({ ...filtros, vacunado: value })
                    }
                />

                <CheckboxGroup
                    label="Esterilizado"
                    options={[
                        { label: 'Sí', value: true },
                        { label: 'No', value: false }
                    ]}
                    selected={filtros.esterilizado}
                    onSelect={(value) =>
                        onAplicar({ ...filtros, esterilizado: value })
                    }
                />
            </div>
        </div>
    );
};

export default FiltroMascotas;
