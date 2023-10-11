import {Header, List} from 'semantic-ui-react';
function SideNavbar() {
    return (
      <div className="wrapper sidebar">
        <div className="tasks">
          <Header>Tasks</Header>
          <List>
            <List.Item>
              <List.Icon name='clipboard' />
              <List.Content>Today</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='tag' />
              <List.Content>Priority</List.Content>
            </List.Item>
          </List>
        </div>
        <div className="team-members">
          <Header>Team Members</Header>
          /will have a list of team members/
        </div>
        <div className="Menu">
          <Header>Menu</Header>
          <List>
            <List.Item>
              <List.Icon name='calendar alternate outline' />
              <List.Content>Overview</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='settings' />
              <List.Content>Settings</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='sign-out' />
              <List.Content>Logout</List.Content>
            </List.Item>
          </List>
        </div>
      </div>
    )
  }
  export default SideNavbar