import { labItems } from "../../content/lab";
import { AiIllustration } from "../../components/ui/brand-visuals";
import { Bento, BentoCell } from "../../components/ui/bento";

export default function LabPage(): JSX.Element {
  return (
    <div className="ds-page">
      <section className="ds-hero">
        <div>
          <span className="ds-eyebrow">Lab IA</span>
          <h1 className="ds-gradient-text">Laboratorio de IA</h1>
          <p className="ds-lead ds-lead-lg">Un espacio vivo para experimentar, medir y llevar ideas a producción.</p>
        </div>
        <AiIllustration kind="network" label="Red neuronal que representa el laboratorio de IA" />
      </section>
      <Bento>
        {labItems.map((item, index) => (
          <BentoCell key={item.title} span={index % 3 === 0 ? "lg" : "sm"} glow={index === 0}>
            <span className="ds-index">{String(index + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </BentoCell>
        ))}
      </Bento>
    </div>
  );
}

