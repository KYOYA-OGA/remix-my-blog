import { Form, useActionData, useTransition } from '@remix-run/react';
import Layout from '~/components/Layout';
import Container from '~/components/Container';
import SibApiV3Sdk from '~/lib/mailer';

import type { ActionFunction, MetaFunction } from '@remix-run/node';
import type { Errors } from '~/types';
import { useEffect, useRef } from 'react';

export const meta: MetaFunction = () => ({
  title: 'お問い合わせ | こっそり生きる',
  description: 'お問い合わせフォームです。ご質問等ご自由にどうぞ。',
});

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const honeypot = formData.get('honeypot');
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  if (honeypot) return;

  const errors: Errors = {};

  if (!name) errors.name = true;
  if (!email || typeof email !== 'string' || !email.includes('@'))
    errors.email = true;
  if (!message) errors.message = true;

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      errors,
    };
  }

  const myApiKey = process.env.SIB_API_KEY;
  const senderEmail = process.env.SIB_SENDER_EMAIL;
  const senderName = process.env.SIB_SENDER_NAME;
  const sendToEmail = process.env.SIB_SEND_TO_EMAIL;
  const sendToName = process.env.SIB_SEND_TO_NAME;

  if (!myApiKey || !senderEmail || !senderName || !sendToName || !sendToEmail) {
    throw new Error('something went wrong');
  }

  SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = myApiKey;

  new SibApiV3Sdk.TransactionalEmailsApi()
    .sendTransacEmail({
      subject: 'サイトからお問い合わせがありました',
      sender: { email: senderEmail, name: senderName },
      replyTo: { email: email, name: name },
      to: [{ name: sendToName, email: sendToEmail }],
      textContent: message,
    })
    .then(
      function (data: any) {
        return { ok: true };
      },
      function (error: any) {
        return { ok: false };
      }
    );
  return {
    ok: true,
    errors: {},
  };
};

const Contact = () => {
  const transition = useTransition();
  const actionData = useActionData();

  const formRef = useRef<HTMLFormElement>(null);

  const isSending = transition.state === 'submitting';

  const labelStyles = `font-medium text-gray-900 block mb-2`;
  const inputStyles = `bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 sm:text-sm`;

  useEffect(() => {
    if (!isSending) {
      formRef.current?.reset();
    }
  }, [isSending]);

  return (
    <Layout>
      <Container>
        <div className="md:text-center">
          <h2 className="text-2xl md:text-3xl">お問い合わせ</h2>
          <p className="mt-3">
            できるだけ返信するよう努めますが何卒ご容赦くださいませ😇
          </p>
        </div>
        <section className="mt-10 mb-28 md:mt-16 max-w-3xl mx-auto">
          <Form replace ref={formRef} method="post">
            <fieldset disabled={isSending}>
              <input type="text" name="honeypot" style={{ display: 'none' }} />
              <div>
                <label htmlFor="fullName" className={labelStyles}>
                  お名前
                </label>
                <input
                  aria-label="お名前"
                  type="text"
                  id="name"
                  className={inputStyles}
                  name="name"
                />
                {actionData?.errors?.name ? (
                  <p className="text-red-600">お名前をご入力ください。</p>
                ) : null}
              </div>

              <div className="mt-6 md:mt-8">
                <label htmlFor="email" className={labelStyles}>
                  メールアドレス
                </label>
                <div className="mt-1 relative">
                  <div
                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    aria-hidden="true"
                  >
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                  </div>
                  <input
                    aria-label="メールアドレス"
                    type="email"
                    id="email"
                    className={`${inputStyles} pl-10`}
                    placeholder="test@test.com"
                    name="email"
                  />
                </div>
                {actionData?.errors?.email ? (
                  <p className="text-red-600">
                    （正しい）メールアドレスをご入力ください。
                  </p>
                ) : null}
              </div>

              <div className="mt-6 md:mt-8">
                <label htmlFor="message" className={labelStyles}>
                  お問い合わせ内容
                </label>
                <textarea
                  aria-label="お問い合わせ内容"
                  id="message"
                  rows={6}
                  className={inputStyles}
                  placeholder="メッセージをどうぞ…"
                  name="message"
                ></textarea>
                {actionData?.errors?.message ? (
                  <p className="text-red-600">
                    お問い合わせ内容をご入力ください。
                  </p>
                ) : null}
              </div>

              <div className="text-center mt-16">
                <button type="submit" className="btn-primary w-1/2 md:w-1/3">
                  {isSending ? '送信中…' : '送信する'}
                </button>
              </div>

              {actionData?.ok && (
                <p className="my-5 text-center text-success">
                  ありがとうございます。
                  <br />
                  無事送信されました！
                </p>
              )}
            </fieldset>
          </Form>
        </section>
      </Container>
    </Layout>
  );
};

export default Contact;
