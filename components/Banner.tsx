import Image from "next/image";
import { Dela_Gothic_One } from "next/font/google";

const dela = Dela_Gothic_One({ subsets: ["cyrillic"], weight: "400" });

function Banner() {
  return (
    <div>
      <ul className="menu">
        <li className={`menu__item  ${dela.className}`}>
          <a href="#" className="menu__link">
            <span className={`menu__link-text menu__link-text--solid`}>
              FPL Mstr
            </span>
            <span
              className="menu__link-text menu__link-text--outline"
              aria-hidden="true"
            >
              FPL Mstr
            </span>
            <img
              className="menu__link-image"
              src="https://picsum.photos/id/252/600/800"
              width="600"
              height="800"
            />
          </a>
        </li>
        <li className="menu__item">
          <a href="#" className="menu__link">
            <span className="menu__link-text menu__link-text--solid">
              FPL Mstr
            </span>
            <span
              className="menu__link-text menu__link-text--outline"
              aria-hidden="true"
            >
              FPL Mstr
            </span>
            <img
              className="menu__link-image"
              src="https://picsum.photos/id/164/600/800"
              width="600"
              height="800"
            />
          </a>
        </li>
        <li className="menu__item">
          <a href="#" className="menu__link">
            <span className="menu__link-text menu__link-text--solid">
              FPL Mstr
            </span>
            <span
              className="menu__link-text menu__link-text--outline"
              aria-hidden="true"
            >
              FPL Mstr
            </span>
            <img
              className="menu__link-image"
              src="https://picsum.photos/id/133/600/800"
              width="600"
              height="800"
            />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Banner;
