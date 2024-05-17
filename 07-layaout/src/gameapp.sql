--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0 (Debian 16.0-1.pgdg120+1)
-- Dumped by pg_dump version 16.0 (Debian 16.0-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: permiso; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permiso (
    id_permiso integer NOT NULL,
    nombre character varying(50) DEFAULT NULL::character varying,
    descripcion character varying(300) DEFAULT NULL::character varying
);


ALTER TABLE public.permiso OWNER TO postgres;

--
-- Name: rol; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rol (
    id integer NOT NULL,
    nombre character varying(50),
    descripcion character varying(300)
);


ALTER TABLE public.rol OWNER TO postgres;

--
-- Name: rol_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rol_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rol_id_seq OWNER TO postgres;

--
-- Name: rol_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rol_id_seq OWNED BY public.rol.id;


--
-- Name: rolxpermiso; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rolxpermiso (
    id_rol integer NOT NULL,
    id_permiso integer NOT NULL
);


ALTER TABLE public.rolxpermiso OWNER TO postgres;

--
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    documento character varying(30) NOT NULL,
    pass character varying(300) NOT NULL,
    estado character varying(12),
    info_perfil character varying(300),
    fecha_usuario_registro date,
    email character varying(60) NOT NULL,
    num_contacto bigint,
    id_rol integer,
    nom_user character varying(150),
    apellido character varying(130)
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- Name: rol id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol ALTER COLUMN id SET DEFAULT nextval('public.rol_id_seq'::regclass);


--
-- Data for Name: permiso; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permiso (id_permiso, nombre, descripcion) FROM stdin;
1	Juegos	Para insertar, leer, añadir a la coleccion de juegos
2	Administrador	Para eliminar usuarios
3	visitante	Solo puede ver catalogo, no puede hacer ningun cambio sin estar logueado
\.


--
-- Data for Name: rol; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rol (id, nombre, descripcion) FROM stdin;
\.


--
-- Data for Name: rolxpermiso; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rolxpermiso (id_rol, id_permiso) FROM stdin;
\.


--
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario (documento, pass, estado, info_perfil, fecha_usuario_registro, email, num_contacto, id_rol, nom_user, apellido) FROM stdin;
\.


--
-- Name: rol_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rol_id_seq', 1, false);


--
-- Name: usuario email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT email_unique UNIQUE (email);


--
-- Name: usuario nombre_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT nombre_unique UNIQUE (nom_user);


--
-- Name: permiso permiso_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permiso
    ADD CONSTRAINT permiso_pkey PRIMARY KEY (id_permiso);


--
-- Name: rol rol_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_pkey PRIMARY KEY (id);


--
-- Name: rolxpermiso rolxpermiso_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rolxpermiso
    ADD CONSTRAINT rolxpermiso_pkey PRIMARY KEY (id_rol, id_permiso);


--
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (documento);


--
-- PostgreSQL database dump complete
--

