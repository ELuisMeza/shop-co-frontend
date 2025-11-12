import { type LucideProps } from "lucide-react"

interface Props {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
  title: string;
  description: string;
  benefits: string[];
  isSeller: boolean;
}

export const BenefitsByCustomer: React.FC<Props> = (props) => {
  return (
    <div className={`bg-linear-to-r ${props.isSeller ? 'from-neutral-900 to-neutral-800 text-white' : 'from-neutral-50 to-background border border-border'} transition hover:shadow-xl p-12 rounded-3xl`}>
    <props.icon className="w-12 h-12 mb-6" />
    <h3 className="text-3xl font-bold mb-4">{props.title}</h3>
    <p className={`text-lg mb-8 leading-relaxed ${props.isSeller ? 'text-neutral-300' : 'text-muted'}`}>
      {props.description}
    </p>
    <ul className="space-y-4">
      {props.benefits.map((item, idx) => (
        <li key={idx} className="flex items-center gap-3">
          <div className={`w-6 h-6 ${props.isSeller ? 'bg-white' : 'bg-neutral-900'} rounded-full flex items-center justify-center shrink-0`}>
            <svg className={`w-4 h-4 ${props.isSeller ? 'text-neutral-900' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="font-medium">{item}</span>
        </li>
      ))}
    </ul>
  </div>
  )
}