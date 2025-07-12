import styles from "./Reports.module.css";
import {
  formattedDate,
  generatePDF,
  handleDownloadExcelSheet,
} from "../../../Components/Logic/LogicFun";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { analyticalReportTable } from "../../../Components/Logic/StaticLists";
import {
  useCallback,
  useMemo,
  useState,
  useSelector,
  useTranslation,
} from "../../../shared/hooks";
import ReportsForm from "./ReportForms/ReportsForm";
import CheckPermissions from "../../../Components/CheckPermissions/CheckPermissions";
import ButtonOne from "../../../Components/UI/Buttons/ButtonOne";
import PrintContractsReport from "../../../Components/Prints/PrintContractsReport";
import MainTitle from "../../../Components/UI/Words/MainTitle";
import { CheckMySubscriptions } from "../../../shared/components";

const AnalyticalReport = ({
  compoundsOptions,
  estatesOptions,
  landlordOptions,
  filterType,
}) => {
  const [analyticalData, setAnlayricalData] = useState([]);
  const [dataEnteried, setDataEnteried] = useState({
    startDueDate: "",
    endDueDate: "",
    compound: "",
    landlord: "",
    estate: "",
  });
  const profileInfo = useSelector((state) => state.profileInfo.data);
  const accountInfo = useSelector((state) => state.accountInfo.data);
  const { t: key } = useTranslation();

  const getSearchData = useCallback((analyticalData, formValues) => {
    setAnlayricalData(analyticalData);
    setDataEnteried(formValues);
  }, []);

  const filterAnalyticalReport = useMemo(() => {
    const analyticalReport = [...(analyticalData || [])];
    return analyticalReport?.map((ex) => {
      return {
        [key("estate")]: ex?.estate?.name || ex?.compound?.name || "-",
        [key("properties")]: ex?.compound || "-",
        [key("startDate")]: formattedDate(ex?.startDate || "-"),
        [key("endDate")]: formattedDate(ex?.endDate || "-"),
        [key("totalIncome2")]: ex?.totalIncome || "-",
        [key("totalExpenses")]: ex?.totalExpenses || "-",
        [key("operatingRatio")]: ex?.operatingRatio || "-",
        [key("netIncome")]: ex?.netIncome || "-",
        [key("operatingRatioForNetIncome")]:
          ex?.operatingRatioForNetIncome || "-",
        [key("status")]: ex?.status || "-",
      };
    });
  }, [analyticalData, key]);

  const operationalTable = useMemo(() => {
    return (
      <table className={`${styles.contract_table} table`}>
        <thead className={styles.table_head}>
          <tr>
            {analyticalReportTable?.map((title, index) => (
              <th key={`${title}_${index}`}>{key(title)}</th>
            ))}
          </tr>
        </thead>

        <tbody className={styles.table_body}>
          {analyticalData?.length > 0 ? (
            analyticalData?.map((item, index) => (
              <tr key={index}>
                <td>{item.estate?.name || item.compound?.name || "-"}</td>
                <td>{item.compound || "-"}</td>
                <td>{formattedDate(item.startDate || "-")}</td>
                <td>{formattedDate(item.endDate || "-")}</td>
                <td>{item.totalIncome}</td>
                <td>{item.totalExpenses}</td>
                <td>{item.operatingRatio}</td>
                <td>{item.netIncome}</td>
                <td>{item.operatingRatioForNetIncome}</td>
                <td>{item.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={`${analyticalReportTable.length || "5"}`}
                className="py-5"
              >
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <FontAwesomeIcon
                    className="fs-1 text-secondary mb-3"
                    icon={faCircleInfo}
                  />
                  <span className="mini_word">{key("noDetails")}</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }, [key, analyticalData]);

  const exportCsvHandler = useCallback(() => {
    handleDownloadExcelSheet(
      filterAnalyticalReport,
      `${key(filterType)}.xlsx`,
      `${key(filterType)}`,
      accountInfo?.account?.isFilesExtractAllowed,
      accountInfo?.account?.isVIP
    );
  }, [filterAnalyticalReport, accountInfo, filterType, key]);

  const downloadPdfHandler = useCallback(() => {
    generatePDF(
      `analyticalReport_${dataEnteried?.startDueDate}`,
      `${key("analyticalReport")}_(${dataEnteried?.startDueDate}) (${
        dataEnteried?.endDueDate
      }) ${dataEnteried?.estate || dataEnteried.compound || ""}`,
      accountInfo?.account?.isFilesExtractAllowed,
      accountInfo?.account?.isVIP
    );
  }, [dataEnteried, accountInfo, key]);

  return (
    <>
      <div>
        <div className="my-3">
          <MainTitle>{key("analyticalReport")}</MainTitle>
        </div>
        <div className="p-md-5">
          <ReportsForm
            landlordOptions={landlordOptions}
            compoundsOptions={compoundsOptions}
            estatesOptions={estatesOptions}
            getSearchData={getSearchData}
            type={filterType}
          />
        </div>

        <hr />

        <div>
          <MainTitle>{key("analyticalReport")}</MainTitle>
          <div className={styles.header}>
            <div>
              {analyticalData && analyticalData?.length > 0 && (
                <CheckMySubscriptions
                  name="isFilesExtractAllowed"
                  accountInfo={accountInfo}
                >
                  <CheckPermissions
                    profileInfo={profileInfo}
                    btnActions={["FINANCIAL_REPORTS"]}
                  >
                    <ButtonOne
                      classes="m-2"
                      borderd
                      color="white"
                      text={key("exportCsv")}
                      onClick={exportCsvHandler}
                    />
                    <ButtonOne
                      onClick={downloadPdfHandler}
                      classes="m-2 bg-navy"
                      borderd
                      text={key("download")}
                    />
                  </CheckPermissions>
                </CheckMySubscriptions>
              )}
            </div>
          </div>
          <div className="scrollableTable">{operationalTable}</div>
        </div>
      </div>
      <div className="d-none">
        <PrintContractsReport
          id={`analyticalReport_${dataEnteried?.startDueDate}`}
          analyticalData={analyticalData}
          dataEnteried={dataEnteried}
          operationalTable={operationalTable}
        />
      </div>
    </>
  );
};

export default AnalyticalReport;
