import Container from './container';
import { Link } from '@remix-run/react';

export default function Footer() {
  return (
    <footer className="bg-[#1E293B] text-gray-300 border-t border-accent-2">
      <Container>
        <div className="py-10 grid grid-cols-1 md:grid-cols-2">
          <div>
            <p className="leading-relaxed">
              ふらりとタイ移住したWeb系エンジニアの記録。
              <br />
              Everything will be alright in the end.
            </p>
            <div className="flex items-center mt-5">
              <img
                src="/images/kyoya.png"
                width="100"
                height="100"
                alt="kyoya"
                className="rounded-full"
              />
              <div className="ml-5">
                <h2>KYOYA</h2>
                <p>若いおじさん</p>
              </div>
            </div>
          </div>
          <div className="mt-5 md:mt-0 space-y-3 md:space-y-6">
            <p>
              技術ブログもやってます→
              <a
                href="https://www.kyoya.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-400 transition-colors hover:text-success ml-2"
              >
                KyoyaDev Blog
              </a>
            </p>
            <div className="flex items-center">
              <p>お問い合わせはこちらへ→</p>
              <Link
                to="/contact"
                className="font-semibold text-blue-400 transition-colors hover:text-success ml-2"
              >
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
