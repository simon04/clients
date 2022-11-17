import { Meta, moduleMetadata, Story } from "@storybook/angular";

import { TableDataSource } from "./table-data-source";
import { TableModule } from "./table.module";

export default {
  title: "Component Library/Table",
  decorators: [
    moduleMetadata({
      imports: [TableModule],
    }),
  ],
  argTypes: {
    alignRowContent: {
      options: ["top", "middle", "bottom", "baseline"],
      control: { type: "select" },
    },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Zt3YSeb6E6lebAffrNLa0h/Tailwind-Component-Library?node-id=1881%3A18371",
    },
  },
} as Meta;

const Template: Story = (args) => ({
  props: args,
  template: `
    <bit-table>
      <ng-container header>
        <tr>
          <th bitCell>Header 1</th>
          <th bitCell>Header 2</th>
          <th bitCell>Header 3</th>
        </tr>
      </ng-container>
      <ng-container body>
        <tr bitRow [alignContent]="alignRowContent">
          <td bitCell>Cell 1</td>
          <td bitCell>Cell 2 <br> Multiline Cell</td>
          <td bitCell>Cell 3</td>
        </tr>
        <tr bitRow [alignContent]="alignRowContent">
          <td bitCell>Cell 4</td>
          <td bitCell>Cell 5</td>
          <td bitCell>Cell 6</td>
        </tr>
        <tr bitRow [alignContent]="alignRowContent">
          <td bitCell>Cell 7 <br> Multiline Cell</td>
          <td bitCell>Cell 8</td>
          <td bitCell>Cell 9</td>
        </tr>
      </ng-container>
    </bit-table>

    `,
});

export const Default = Template.bind({});
Default.args = {
  alignRowContent: "baseline",
};

const data = new TableDataSource<{ id: number; name: string; other: string }>();
const c = data.connect();

data.data = [...Array(10).keys()].map((i) => ({
  id: i,
  name: `name-${i}`,
  other: `other-${i}`,
}));

const SortableTemplate: Story = (args) => ({
  props: {
    dataSource: data,
    data: c,
  },
  template: `
    <bit-table [dataSource]="dataSource">
      <ng-container header>
        <tr>
          <th bitCell bitSortable="id">Id</th>
          <th bitCell bitSortable="name">Name</th>
          <th bitCell bitSortable="other">Other</th>
        </tr>
      </ng-container>
      <ng-container body>
        <tr bitRow *ngFor="let r of data | async">
          <td bitCell>{{ r.id }}</td>
          <td bitCell>{{ r.name }}</td>
          <td bitCell>{{ r.other }}</td>
        </tr>
      </ng-container>
    </bit-table>
    `,
});

export const Sortable = SortableTemplate.bind({});
