export interface Slide {
  id: number;
  text: string;

}

export interface Story {
  id: number;
  title: string;
  slides: Slide[];
}

export interface About {
  id: number;
  top_header: string;
  top_description: string;
  bottom_header: string;
  bottom_description: string;
  img: string;
  stories: Story[];
}

