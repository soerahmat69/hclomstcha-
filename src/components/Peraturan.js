import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { data } from "autoprefixer";
// import { useNavigate } from "react-router-dom";

const Peraturan = ({call,totalz}) => {
  let [read, setR] = useState(false);
  let [ongkir, setongkir] = useState("");
  let [tanggal, settanggal] = useState("");
  let [provinsi, setprovinsi] = useState("");
  let [kota, setkota] = useState("");
  let [bukti, setbukti] = useState({ bukti_payment: "" });
  let [prov, setprov] = useState("");
  let [kot, setkot] = useState("");
  let [kurir, setkurir] = useState("");
  let peraturan = document.getElementsByName("peraturan");


  useEffect(() => {
    axios
      .get("http://localhost:8080/provinsi")
      .then((response) => {
        const overa = response.data;
        setprovinsi(overa);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:8080/kota")
      .then((response) => {
        const overa = response.data;
        setkota(overa);
      })
      .catch((error) => {
        console.log(error);
      });


  }, []);

  
  function readP() {
    if (peraturan[0].checked === true) {
      setR(peraturan[0].checked);
    } else {
      console.log("belum baca ni orang males bet ");
    }
  }

  const valueSubmit = (e) => {
    e.preventDefault();

    const value = e.target.files[0];
    console.log(value);
    setbukti({
      ...bukti,
      [e.target.name]: value,
    });
  };

  const submitBooking = (e) => {
    const formData = new FormData();
    formData.append("tgl_rental", tanggal);
    formData.append("biaya_ongkir", ongkir);
    formData.append("order_id", call.call);
    formData.append("bukti_payment", bukti.bukti_payment);

    axios
      .post(`http://localhost:8080/booking/order`, formData)
      .then((response) => {})
      .catch((error) => {
        if (error.response) {
          console.log(error.response.status);
        }
      });
  };

  if (read === true) {
    return (
      <>
        <div id="cloz" className="fixed w-screen z-40">
          <div
            id="clozz"
            className="absolute  bg-opacity-60 bg-black visible  w-screen h-screen   "
          >
            <div className="w-[410px] bg-[#FEC9D1] mx-auto  my-10 rounded-md h-[615px] ">
              <div>
                <h3 className="text-center  mb-[37px] font-['poppins'] text-[26px] font-semibold">
                  Booking
                </h3>
              </div>

              <div className=" h-max  flex flex-col">
                <form onSubmit={submitBooking}>
                  <div className=" mx-[29px] h-[470px] overflow-y-auto">
                    <div className="flex-col flex mx-2 mb-4">
                      <label className="font-['poppins'] text-[26px] font-medium">
                        Tanggal Rental{" "}
                      </label>
                      <input
                        type="date"
                        onChange={(e) => settanggal(e.target.value)}
                        className="h-[42px]  ring-1  ring-black rounded-md"
                      />
                    </div>
                    <div className="flex-col flex mx-2 mb-4">
                      <label className="font-['poppins'] text-[26px] font-medium">
                        Pilih Provinsi{" "}
                      </label>
                      <select
                        onChange={(e) => {
                          let me = e.target.value;
                          setprov(me);
                        }}
                        name="provinsi"
                        className="rounded-md"
                      >
                        <option selected>pilih provinsi</option>
                        {Array.from(provinsi).map((r) => {
                          return (
                            <option value={r.province_id}>{r.province}</option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="flex-col flex mx-2 mb-4">
                      <label className="font-['poppins'] text-[26px] font-medium">
                        Pilih Kota{" "}
                      </label>
                      <select
                        onChange={(e) => {
                          let me = e.target.value;
                          setkot(me);
                        }}
                        name="kota"
                        className="rounded-md"
                      >
                        <option selected>pilih kota</option>
                        {Array.from(kota).map((r) => {
                          if (r.province_id === prov) {
                            return (
                              <option value={r.city_id}>{r.city_name}</option>
                            );
                          }
                        })}
                      </select>
                    </div>
                    <div className="flex-col flex mx-2 mb-4">
                      <label className="font-['poppins'] text-[26px] font-medium">
                        Pilih Kurir{" "}
                      </label>
                      <select 
                        onClick={(e) => {
                          if (kot.length > 0) {
                            axios
                              .get(`http://localhost:8080/cost/${kot}`)
                              .then((response) => {
                                const overa = response.data;
                                setkurir(overa);
                                console.log(kurir);
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                          }
                        }}
                        onChange={(e) => {
                          let me = e.target.value;
                          setongkir(me);
                        }}
                        name="kurir"
                        className="rounded-md"
                      >
                        <option selected>pilih service</option>
                        {Array.from(kurir).map((r) => {
                          return (
                            <option value={r.cost[0]["value"]}>
                              {r.service}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="flex-col flex mx-2 mb-4">
                      <label className="font-['poppins'] text-[26px] font-medium">
                        Biaya Ongkir{" "}
                      </label>
                      <input
                        type="number"
                        value={ongkir} disabled
                        className="h-[42px]  ring-1  ring-black rounded-md"
                      />
                    </div>
                    <div className="flex-col flex mx-2 mb-4">
                      <label className="font-['poppins'] text-[26px] font-medium">
                        Total Biaya{" "}
                      </label>
                      <input
                        type="number"
                        value={parseInt(totalz) + parseInt(ongkir)} disabled
                        className="h-[42px]  ring-1  ring-black rounded-md"
                      />
                    </div>
               
                    <div className="flex-col flex mx-2 mb-4">
                      <label className="font-['poppins'] text-[26px] font-medium">
                        Bukti Pembayaran{" "}
                      </label>
                      <input 
                        type="file"
                        onChange={valueSubmit}
                        name="bukti_payment"
                        className="h-[42px]  ring-1  ring-black rounded-md"
                        />
                    </div>
                  </div>
                  <div className="flex mt-3 mx-[29px]  items-end justify-end">
                    <button className="w-[66px] h-[34px] bg-[#916FA1] text-white font-['poppins'] font-semibold rounded-lg ">
                      Next
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div id="cloz" className="fixed w-screen z-40">
          <div
            id="clozz"
            className="absolute visible  bg-opacity-60 bg-black  w-screen h-screen   "
          >
            <div className="w-[410px] bg-[#FEC9D1] mx-auto  my-10 rounded-md h-[615px] ">
              <div>
                <h3 className="text-center mb-[37px] font-['poppins'] text-[26px] font-semibold">
                  peraturan
                </h3>
              </div>
              <div className=" h-max  flex flex-col">
                <div className=" mx-[29px] h-[470px]  overflow-y-hidden">
                  <ul className="  list-item ">
                    <li className=" whitespace-normal my-3 text-justify	font-['poppins']">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s,
                    </li>
                    <li className=" whitespace-normal my-3 text-justify	font-['poppins']">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s,
                    </li>
                    <li className=" whitespace-normal my-3 text-justify	font-['poppins']">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s,
                    </li>
                  </ul>
                </div>
                <div className="flex mt-3  mx-[29px]  items-start justify-between">
                  <div className=" flex flex-row  items-center ">
                    <input
                      value="true"
                      name="peraturan"
                      className="mr-2"
                      type="checkbox"
                    />
                    <p className="font-['poppins'] font-semibold ">
                      agreement{" "}
                    </p>
                  </div>
                  <button
                    onClick={readP}
                    className="w-[66px] h-[34px] bg-[#916FA1] text-white font-['poppins'] font-semibold rounded-lg "
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Peraturan;
