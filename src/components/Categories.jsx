import Card from './Card';
import Marquee from "react-fast-marquee";

function Categories() {
  const categories = [
    { ImgURL: '/Logos.png', text: 'Logos' },
    { ImgURL: '/Cards.png', text: 'Card Designs' },
    { ImgURL: '/Branding.png', text: 'Branding' },
    { ImgURL: '/Graphics.png', text: 'Graphics' },
    { ImgURL: '/icons.png', text: 'Iconography' },
    { ImgURL: '/UI_UX.png', text: 'UI/UX Designs' },
    { ImgURL: '/Mocups.png', text: 'Mocups' },
    { ImgURL: '/Print.png', text: 'Print Design' },
    { ImgURL: '/Newsletter.png', text: 'News Letters' },
    { ImgURL: '/Packaging.png', text: 'Packaging' },
    
  ];

  return (
    <Marquee gradient={false} speed={60} pauseOnHover={true}>
      {categories.map((cat, i) => (
        <Card key={i} url={cat.ImgURL} category={cat.text} />
      ))}
    </Marquee>
  );
}

export default Categories;
