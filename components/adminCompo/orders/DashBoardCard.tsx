import type { LucideIcon} from "lucide-react"

const DashBoardCard = ({icon: Icon, orderValue, name, description}: {icon:LucideIcon ,orderValue: number , name: string, description: string}) => {
  return (
    <div className="default-border p-3 shadow-2xl rounded-lg shadow-gray-500">
          <div  className="flex justify-between items-center">
            <h1 className="text-gray-500/80 font-semibold">{name}</h1>
            <Icon size={24} className=""/>
          </div>

          <p className="font-bold text-2xl mt-2">{orderValue}</p>
          <p className="mt-8 text-gray-500/80 text-sm font-semibold">{description}</p>
        </div>
  )
}

export default DashBoardCard