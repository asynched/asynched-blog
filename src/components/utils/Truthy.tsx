type TruthyProps = {
  cond: boolean
  children: () => React.ReactNode
  else?: () => React.ReactNode
}

export default function Truthy({
  cond,
  children,
  else: elseChild,
}: TruthyProps) {
  return <>{cond ? children() : elseChild?.() || null}</>
}
