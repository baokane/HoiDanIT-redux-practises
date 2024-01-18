import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UsersTable from './users.table';
import BlogTable from './blog/blogs.table';

function TabsContent() {
    return (
        <Tabs
            defaultActiveKey="user"
            id="uncontrolled-tab-example"
            className="mb-3 mt-3"
        >

            <Tab eventKey="user" title="Users">
                <UsersTable />
            </Tab>
            <Tab eventKey="blog" title="Blogs">
                <BlogTable />
            </Tab>

        </Tabs>
    );
}

export default TabsContent;