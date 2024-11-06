USE [ExamDB]
GO
/****** Object:  Table [dbo].[candidate]    Script Date: 06-11-2024 15:28:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[candidate](
	[c_id] [bigint] IDENTITY(1,1) NOT NULL,
	[birthdate] [date] NULL,
	[college] [varchar](255) NULL,
	[email] [varchar](255) NULL,
	[name] [varchar](255) NULL,
	[password] [varchar](255) NULL,
	[phone] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[c_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[examiner]    Script Date: 06-11-2024 15:28:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[examiner](
	[e_id] [bigint] IDENTITY(1,1) NOT NULL,
	[email] [varchar](255) NULL,
	[name] [varchar](255) NULL,
	[password] [varchar](255) NULL,
	[phone] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[e_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[mcq]    Script Date: 06-11-2024 15:28:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[mcq](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[correct_answer] [varchar](255) NOT NULL,
	[difficulty_level] [varchar](255) NOT NULL,
	[optiona] [varchar](255) NOT NULL,
	[optionb] [varchar](255) NOT NULL,
	[optionc] [varchar](255) NOT NULL,
	[optiond] [varchar](255) NOT NULL,
	[question] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[candidate] ON 
GO
INSERT [dbo].[candidate] ([c_id], [birthdate], [college], [email], [name], [password], [phone]) VALUES (9, CAST(N'2003-11-10' AS Date), N'BVM', N'brijesh@gmail.com', N'Brijesh Patel', N'$2a$10$j9PmCIkk64iHoqWhMhf8UuBpmk7PX1a1K0TxcoXigK5WBKSOG2Rk2', N'8347207838')
GO
INSERT [dbo].[candidate] ([c_id], [birthdate], [college], [email], [name], [password], [phone]) VALUES (11, CAST(N'2003-11-10' AS Date), N'LD', N'vaidik@gmail.com', N'Vaidik Patel', N'$2a$10$VdzHUojhTofEmYL5LPrQZeK/o8dP//nmQtzBnw81vVsgHSlUIF.eO', N'8888888888')
GO
INSERT [dbo].[candidate] ([c_id], [birthdate], [college], [email], [name], [password], [phone]) VALUES (12, CAST(N'2003-11-10' AS Date), N'LD', N'brijesh1@gmail.com', N'Brijesh Patel', N'$2a$10$/M./2RC.lGwX3l3db8/jzeDkMyc0yUZbKu8DNieLDFVyH/DfOjYgK', N'99999998')
GO
INSERT [dbo].[candidate] ([c_id], [birthdate], [college], [email], [name], [password], [phone]) VALUES (13, CAST(N'2003-11-05' AS Date), N'LD', N'rahul@gmail.com', N'Rahul Patel', N'$2a$10$zkUeiP2zXvrVcsM0YH4XXeYv5/a2iqSnRMqLLRq4gjBbCgsDpwaAu', N'9797979797')
GO
SET IDENTITY_INSERT [dbo].[candidate] OFF
GO
SET IDENTITY_INSERT [dbo].[examiner] ON 
GO
INSERT [dbo].[examiner] ([e_id], [email], [name], [password], [phone]) VALUES (2, N'admin@gmail.com', N'admin', N'$2a$10$8eadAqz.TitRcFu4oSC.duc8PiDxwiQgKM4ydd3aEzRhhMyJ7c2Tu', N'8347207838')
GO
SET IDENTITY_INSERT [dbo].[examiner] OFF
GO
SET IDENTITY_INSERT [dbo].[mcq] ON 
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [difficulty_level], [optiona], [optionb], [optionc], [optiond], [question]) VALUES (1, N'D', N'Medium', N'Berlin', N'Madrid', N'Paris', N'Rome', N'What is the capital of Italy?')
GO
SET IDENTITY_INSERT [dbo].[mcq] OFF
GO
