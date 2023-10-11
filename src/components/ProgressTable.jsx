import { Header, Progress } from "semantic-ui-react"

function ProgressTable() {
    return (
      <div className="progress-table wrapper">
        <Header>Today's Progress</Header>
        <div>
          <span><Progress fluid percent={45} progress /></span>
        </div>
      </div>
    )
  }
  
export default ProgressTable