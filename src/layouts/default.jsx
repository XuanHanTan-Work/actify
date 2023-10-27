import { useEffect } from 'react'
import App from '@/src/components/App'
import Main from '@/src/components/Main'
import Header from '@/src/components/Header'
import Drawer from '@/src/components/Drawer'
import Footer from '@/src/components/Footer'

import { List, ListItemLink, ListGroup } from 'actify'
import { version } from '@/package.json'

const components = [
  {
    label: 'App bars',
    children: [
      {
        name: 'Bottom app bar'
      },
      {
        name: 'Top app bar'
      }
    ]
  },
  {
    name: 'Badges'
  },
  {
    label: 'Buttons',
    children: [
      {
        name: 'Button'
      },
      {
        name: 'FAB'
      },
      {
        name: 'Icon button'
      },
      {
        name: 'Segmented button'
      }
    ]
  },
  {
    name: 'Cards'
  },
  {
    name: 'Swiper'
  },
  {
    name: 'Carousel'
  },
  {
    name: 'Checkbox'
  },
  {
    name: 'Chips'
  },
  {
    name: 'Date pickers'
  },
  {
    name: 'Time pickers'
  },
  {
    name: 'Dialogs'
  },
  {
    name: 'Popover'
  },
  {
    name: 'Divider'
  },
  {
    name: 'Lists'
  },
  {
    name: 'Menus'
  },
  {
    name: 'Select'
  },
  {
    label: 'Navigation',
    children: [
      {
        name: 'Navigation bar'
      },
      {
        name: 'Navigation drawer'
      },
      {
        name: 'Navigation rail'
      }
    ]
  },
  {
    name: 'Progress'
  },
  {
    name: 'Radio button'
  },
  {
    name: 'Sliders'
  },
  {
    name: 'Snackbar'
  },
  {
    name: 'Toast'
  },
  {
    name: 'Switch'
  },
  {
    name: 'Tabs'
  },
  {
    name: 'Text fields'
  },
  {
    name: 'Tooltips'
  },
  {
    name: 'Terminal'
  },
  {
    name: 'Before After'
  }
]

const spaces2Hyphen = (str) => str.toLowerCase().split(' ').join('-')

const Layout = ({ children }) => {
  useEffect(() => {
    console.log(`
    ___          __   _  ____      
   /   |  _____ / /_ (_)/ __/__  __
  / /| | / ___// __// // /_ / / / /
 / ___ |/ /__ / /_ / // __// /_/ / 
/_/  |_|\___/ \__//_//_/   \__, /  
                          /____/   
          v${version}
`)
  }, [])

  return (
    <App>
      <Header />
      <Drawer>
        <List>
          <ListItemLink to="/getting-started/icon">Icon</ListItemLink>
          <ListItemLink to="/getting-started/theme">Theme</ListItemLink>
          {components.map((component, index) =>
            component.children ? (
              <ListGroup key={index} label={component.label}>
                {component.children.map((child, index) => (
                  <ListItemLink
                    key={index}
                    to={
                      `/components/${spaces2Hyphen(component.label)}/` +
                      child.name.toLowerCase().split(' ').join('-')
                    }
                  >
                    {child.name}
                  </ListItemLink>
                ))}
              </ListGroup>
            ) : (
              <ListItemLink
                key={index}
                to={'/components/' + spaces2Hyphen(component.name)}
              >
                {component.name}
              </ListItemLink>
            )
          )}
        </List>
      </Drawer>
      <Main>{children}</Main>
      <Footer />
    </App>
  )
}

export default Layout