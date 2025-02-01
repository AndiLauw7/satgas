/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Pagination, Table } from "react-bootstrap";

const GlobalTable = (props) => {
  const { columns, data, actions, itemsPerPage } = props;

  const [currentPage, setCurrentPage] = useState(1);

  // Hitung total halaman
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Menentukan data untuk halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Fungsi untuk menangani perubahan halaman
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div
      className="table-responsive"
      style={{ maxHeight: "400px", overflowY: "auto" }}
    >
      {data.length === 0 ? (
        <p className="text-blue-600 text-3xl">Data Belum Tersedia </p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>No</th>
              {columns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>{indexOfFirstItem + rowIndex + 1}</td>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>
                    {col === "Image" ? (
                      <img
                        src={row[col]}
                        alt="profil"
                        style={{ width: "100px" }}
                      />
                    ) : (
                      row[col]
                    )}
                  </td>
                ))}
                <td>{actions(row)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="pagination-container flex justify-center navigation">
        <Pagination>
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          />

          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </Pagination>
      </div>
    </div>
  );
};
export default GlobalTable;
