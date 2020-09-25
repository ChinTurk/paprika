import React from "react";
import PropTypes from "prop-types";
import useI18n from "@paprika/l10n/lib/useI18n";
import Container from "../Container";
import types from "../../types";

function formatNumber({ number, locale, options = {} }) {
  return Intl.NumberFormat(locale, options).format(number);
}

export function withDecimalSeparatorOnly({ number, locale, options = {} }) {
  return new Intl.NumberFormat(locale, {
    useGrouping: true,
    ...options,
  })
    .formatToParts(number)
    .filter(chunk => chunk.type !== "group")
    .map(chunk => chunk.value)
    .join("");
}

export default function Numeric(props) {
  const { align, number: propNumber, currency: currencySymbol, intl, color, displayOnlyDecimals, ...moreProps } = props;
  const number = Number(propNumber);
  const i18n = useI18n();

  if (Number.isNaN(number)) {
    console.warn(`string|number ${propNumber} is Not a Number`);
  }

  const currency = currencySymbol ? { style: "currency", currency: currencySymbol } : {};
  const decimalNumbers =
    number % 1 === 0 ? { minimumFractionDigits: 0, maximumFractionDigits: 0 } : { minimumFractionDigits: 1 };

  const i18nNumber =
    "Intl" in window
      ? formatNumber({ number, locale: i18n.locale, options: { ...currency, ...decimalNumbers, ...intl } })
      : propNumber;

  if (displayOnlyDecimals) {
    const numberWithDecimalsOnly = withDecimalSeparatorOnly({
      number,
      locale: i18n.locale,
      options: { ...currency, ...decimalNumbers, ...intl },
    });
    return (
      <Container align={align} color={color} {...moreProps} data-pka-anchor="data-fields-numeric">
        {typeof cell === "function" ? propNumber(numberWithDecimalsOnly) : numberWithDecimalsOnly}
      </Container>
    );
  }

  return (
    <Container align={align} color={color} {...moreProps} data-pka-anchor="data-fields-numeric">
      {typeof cell === "function" ? propNumber(i18nNumber) : i18nNumber}
    </Container>
  );
}

Numeric.propTypes = {
  /**
   * The cell value to be localize
   */
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /**
   * Text alignment for the number default is right
   */
  align: PropTypes.oneOf([types.align.LEFT, types.align.RIGHT, types.align.CENTER]),
  /**
   * The window.Intl.numberFormat option object https://mzl.la/3iW0ioQ
   */
  intl: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  /**
   * When passing a currency string as 'EUR' or 'JPY' will display the correct currency symbol, is a short version instead of using the intl prop.
   */
  currency: PropTypes.string,
  /**
   * Add a color to the number, accept any kind of html color #F60, rgba(100,100,100, 0.5), etc.
   */
  color: PropTypes.string,
  /**
   * Controls if the number should be display with full delimiter or only the decimal separators
   */
  displayOnlyDecimals: PropTypes.bool,
};

Numeric.defaultProps = {
  align: types.align.RIGHT,
  color: null,
  currency: null,
  displayOnlyDecimals: true,
  intl: {},
};
