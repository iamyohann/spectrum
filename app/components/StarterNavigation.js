import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Tooltip from '@atlaskit/tooltip';
import { ipcRenderer } from 'electron';
import Nav, {
  AkContainerTitle,
  AkCreateDrawer,
  AkNavigationItem,
  AkSearchDrawer, createGlobalTheme
} from '@atlaskit/navigation';
import Navigation, {
  AkCollapseOverflowItem,
  AkCollapseOverflowItemGroup,
  AkCollapseOverflow,
  presetThemes,
  AkNavigationItemGroup,
  AkGlobalItem,
} from '@atlaskit/navigation';
import AkDropdownMenu, {
  DropdownItemGroup,
  DropdownItem,
} from '@atlaskit/dropdown-menu';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import GearIcon from '@atlaskit/icon/glyph/settings';
import SearchIcon from '@atlaskit/icon/glyph/search';
import CreateIcon from '@atlaskit/icon/glyph/add';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import SpectrumIcon from './Logo';
import ArrowleftIcon from '@atlaskit/icon/glyph/arrow-left';

import CreateDrawer from './CreateDrawer';
import SearchDrawer from './SearchDrawer';
import HelpDropdownMenu from './HelpDropdownMenu';
import AccountDropdownMenu from './AccountDropdownMenu';
import HomeFilledIcon from '@atlaskit/icon/glyph/home-filled';
import UnlockFilledIcon from '@atlaskit/icon/glyph/unlock-filled';
import WorldIcon from '@atlaskit/icon/glyph/world';
import styled from 'styled-components';
import ScreenIcon from '@atlaskit/icon/glyph/screen';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import MediaServicesFilterIcon from '@atlaskit/icon/glyph/media-services/filter';
import PersonCircleIcon from '@atlaskit/icon/glyph/person-circle';
import { default as DropDownAccountsList } from './DropDownAccountsList';
import { default as DropDownRegionList } from './DropDownRegionList';

class StarterNavigation extends React.Component {
  static contextTypes = {
    navOpenState: PropTypes.object,
    router: PropTypes.object,
  }

  state = {
    navLinks: [
      ['/', 'Dashboard', DashboardIcon],
      ['/network', 'Network', MediaServicesFilterIcon],
      ['/resources', 'Resources', ScreenIcon],
      ['/security', 'Security', UnlockFilledIcon],
      ['/settings', 'Settings', GearIcon],
    ]
  }

  componentWillMount() {
    ipcRenderer.send('account.list', {});
    ipcRenderer.send('regions.list', {});
  }

  openDrawer = (openDrawer) => {
    this.setState({ openDrawer });
  }

  render() {
    const backIcon = <ArrowleftIcon label="Back icon" size="medium" />;
    const globalPrimaryIcon = <DashboardIcon primaryColor="#FFFFFF" secondaryColor="#FF0000" />
    const theme = createGlobalTheme('#FFFFFF', '#222222');
    return (
      <Nav
        topOffset={30}
        isOpen={this.context.navOpenState.isOpen}
        width={this.context.navOpenState.width}
        onResize={this.props.onNavResize}
        containerHeaderComponent={() => (
          <AkContainerTitle
            icon={
              <SpectrumIcon />
            }
            text="Spectrum"
          />
        )}
        globalTheme={theme}
        globalPrimaryIcon={<HomeFilledIcon />}
        globalSecondaryActions={[
          <AkDropdownMenu
            appearance="tall"
            position="right bottom"
            trigger={
              <AkGlobalItem>
                <Tooltip position="right" content="Regions">
                  <WorldIcon />
                </Tooltip>
              </AkGlobalItem>
            }
          >
            <DropdownItemGroup title="Switch Regions">
              <DropDownRegionList />
            </DropdownItemGroup>
          </AkDropdownMenu>,
          <AkDropdownMenu
            appearance="tall"
            position="right bottom"
            trigger={
              <AkGlobalItem>
                <Tooltip position="right" content="Accounts">
                  <PersonCircleIcon />
                </Tooltip>
              </AkGlobalItem>
            }
          >
            <DropdownItemGroup title="Switch Account">
              <DropDownAccountsList />
              <DropdownItem elemBefore={<SettingsIcon />}>Manage Accounts</DropdownItem>
            </DropdownItemGroup>
          </AkDropdownMenu>,
        ]}
        globalSearchIcon={<SearchIcon label="Search icon" />}
        hasBlanket
        drawers={[
          <AkSearchDrawer
            backIcon={backIcon}
            isOpen={this.state.openDrawer === 'search'}
            key="search"
            onBackButton={() => this.openDrawer(null)}
            primaryIcon={globalPrimaryIcon}
          >
            <SearchDrawer
              onResultClicked={() => this.openDrawer(null)}
              onSearchInputRef={(ref) => {
                this.searchInputRef = ref;
              }}
            />
          </AkSearchDrawer>,
          <AkCreateDrawer
            backIcon={backIcon}
            isOpen={this.state.openDrawer === 'create'}
            key="create"
            onBackButton={() => this.openDrawer(null)}
            primaryIcon={globalPrimaryIcon}
          >
            <CreateDrawer
              onItemClicked={() => this.openDrawer(null)}
            />
          </AkCreateDrawer>
        ]}
        globalAccountItem={AccountDropdownMenu}
        globalCreateIcon={<CreateIcon label="Create icon" />}
        globalHelpItem={HelpDropdownMenu}
        onSearchDrawerOpen={() => this.openDrawer('search')}
        onCreateDrawerOpen={() => this.openDrawer('create')}
      >
        {
          this.state.navLinks.map(link => {
            const [url, title, Icon] = link;
            return (
              <Link key={url} to={url}>
                <AkNavigationItem
                  globalTheme={theme}
                  icon={<Icon label={title} size="large" />}
                  text={title}
                />
              </Link>
            );
          }, this)
        }
      </Nav>
    );
  }
}

export default (StarterNavigation);
