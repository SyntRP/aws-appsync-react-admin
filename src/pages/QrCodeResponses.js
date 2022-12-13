import QrCodeResponses from "../components/qr-code-responses";
import withSuspense from "../helpers/hoc/withSuspense";

const QrCodeResponsesPage = () => {
  return <QrCodeResponses />;
};

export default withSuspense(QrCodeResponsesPage);
