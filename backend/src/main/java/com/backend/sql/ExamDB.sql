USE [ExamDB]
GO
/****** Object:  Table [dbo].[candidate]    Script Date: 13-11-2024 17:42:34 ******/
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
/****** Object:  Table [dbo].[candidate_exam]    Script Date: 13-11-2024 17:42:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[candidate_exam](
	[candidate_exam_id] [bigint] IDENTITY(1,1) NOT NULL,
	[candidate_id] [bigint] NOT NULL,
	[exam_id] [bigint] NOT NULL,
	[started_at] [datetime] NULL,
	[completed_at] [datetime] NULL,
	[score] [int] NULL,
	[status] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[candidate_exam_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[candidate_mcq_answers]    Script Date: 13-11-2024 17:42:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[candidate_mcq_answers](
	[answer_id] [bigint] IDENTITY(1,1) NOT NULL,
	[candidate_exam_id] [bigint] NOT NULL,
	[mcq_id] [bigint] NOT NULL,
	[selected_option] [varchar](255) NULL,
	[submitted_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[answer_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[candidate_programming_answers]    Script Date: 13-11-2024 17:42:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[candidate_programming_answers](
	[answer_id] [bigint] IDENTITY(1,1) NOT NULL,
	[candidate_exam_id] [bigint] NOT NULL,
	[programming_question_id] [bigint] NOT NULL,
	[submitted_code] [varchar](255) NULL,
	[submitted_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[answer_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[exam]    Script Date: 13-11-2024 17:42:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[exam](
	[exam_id] [bigint] IDENTITY(1,1) NOT NULL,
	[exam_name] [varchar](255) NOT NULL,
	[exam_type] [varchar](255) NULL,
	[total_marks] [int] NOT NULL,
	[passing_marks] [int] NOT NULL,
	[duration_minutes] [int] NOT NULL,
	[examiner_id] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[exam_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[exam_programming_questions]    Script Date: 13-11-2024 17:42:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[exam_programming_questions](
	[exam_programming_question_id] [bigint] IDENTITY(1,1) NOT NULL,
	[exam_id] [bigint] NOT NULL,
	[programming_question_id] [bigint] NOT NULL,
	[order] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[exam_programming_question_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[exam_questions]    Script Date: 13-11-2024 17:42:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[exam_questions](
	[exam_question_id] [bigint] IDENTITY(1,1) NOT NULL,
	[exam_id] [bigint] NOT NULL,
	[mcq_id] [bigint] NOT NULL,
	[order] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[exam_question_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[examiner]    Script Date: 13-11-2024 17:42:34 ******/
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
/****** Object:  Table [dbo].[mcq]    Script Date: 13-11-2024 17:42:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[mcq](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[correct_answer] [varchar](255) NOT NULL,
	[category] [varchar](255) NOT NULL,
	[optiona] [varchar](255) NOT NULL,
	[optionb] [varchar](255) NOT NULL,
	[optionc] [varchar](255) NOT NULL,
	[optiond] [varchar](255) NOT NULL,
	[question] [varchar](255) NOT NULL,
	[difficulty] [varchar](255) NULL,
	[marks] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[programming_question]    Script Date: 13-11-2024 17:42:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[programming_question](
	[pq_id] [bigint] IDENTITY(1,1) NOT NULL,
	[question_text] [varchar](255) NULL,
	[reference_answer] [varchar](255) NULL,
	[difficulty] [varchar](255) NULL,
	[category] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[pq_id] ASC
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
INSERT [dbo].[candidate] ([c_id], [birthdate], [college], [email], [name], [password], [phone]) VALUES (16, CAST(N'2000-05-25' AS Date), N'College C', N'alicejohnson@example.com', N'Alice Johnson', N'$2a$10$Z.YR7CvtOsFvQjM.uWuqs.Czk19x38G7aRCrafjUv7r7hg0l4.S4G', N'1122334455')
GO
INSERT [dbo].[candidate] ([c_id], [birthdate], [college], [email], [name], [password], [phone]) VALUES (17, CAST(N'2003-11-10' AS Date), N'College A', N'johndoe@example.com', N'John Doe', N'$2a$10$MeNiAD8NG2Ug07gmTjeEpej/pbR2W.f.qt60434KMkcrQPCiAJcKS', N'1234567890')
GO
SET IDENTITY_INSERT [dbo].[candidate] OFF
GO
SET IDENTITY_INSERT [dbo].[candidate_exam] ON 
GO
INSERT [dbo].[candidate_exam] ([candidate_exam_id], [candidate_id], [exam_id], [started_at], [completed_at], [score], [status]) VALUES (1, 9, 6, CAST(N'2024-11-11T17:59:43.917' AS DateTime), NULL, 2, N'completed')
GO
INSERT [dbo].[candidate_exam] ([candidate_exam_id], [candidate_id], [exam_id], [started_at], [completed_at], [score], [status]) VALUES (2, 9, 9, CAST(N'2024-11-12T17:24:36.277' AS DateTime), NULL, 4, N'completed')
GO
INSERT [dbo].[candidate_exam] ([candidate_exam_id], [candidate_id], [exam_id], [started_at], [completed_at], [score], [status]) VALUES (3, 9, 13, CAST(N'2024-11-12T22:32:44.350' AS DateTime), NULL, 4, N'completed')
GO
SET IDENTITY_INSERT [dbo].[candidate_exam] OFF
GO
SET IDENTITY_INSERT [dbo].[candidate_mcq_answers] ON 
GO
INSERT [dbo].[candidate_mcq_answers] ([answer_id], [candidate_exam_id], [mcq_id], [selected_option], [submitted_at]) VALUES (1, 1, 8, N'C', CAST(N'2024-11-11T18:11:14.260' AS DateTime))
GO
INSERT [dbo].[candidate_mcq_answers] ([answer_id], [candidate_exam_id], [mcq_id], [selected_option], [submitted_at]) VALUES (2, 1, 8, N'C', CAST(N'2024-11-12T17:18:13.177' AS DateTime))
GO
INSERT [dbo].[candidate_mcq_answers] ([answer_id], [candidate_exam_id], [mcq_id], [selected_option], [submitted_at]) VALUES (3, 2, 8, N'C', CAST(N'2024-11-12T17:25:47.200' AS DateTime))
GO
INSERT [dbo].[candidate_mcq_answers] ([answer_id], [candidate_exam_id], [mcq_id], [selected_option], [submitted_at]) VALUES (4, 3, 8, N'C', CAST(N'2024-11-13T09:38:34.467' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[candidate_mcq_answers] OFF
GO
SET IDENTITY_INSERT [dbo].[exam] ON 
GO
INSERT [dbo].[exam] ([exam_id], [exam_name], [exam_type], [total_marks], [passing_marks], [duration_minutes], [examiner_id]) VALUES (6, N'Sample Exam', N'MCQ', 100, 40, 60, NULL)
GO
INSERT [dbo].[exam] ([exam_id], [exam_name], [exam_type], [total_marks], [passing_marks], [duration_minutes], [examiner_id]) VALUES (9, N'Demo Exam', N'MCQ', 50, 20, 30, NULL)
GO
INSERT [dbo].[exam] ([exam_id], [exam_name], [exam_type], [total_marks], [passing_marks], [duration_minutes], [examiner_id]) VALUES (13, N'Demo', N'MCQ', 5, 4, 2, NULL)
GO
SET IDENTITY_INSERT [dbo].[exam] OFF
GO
SET IDENTITY_INSERT [dbo].[examiner] ON 
GO
INSERT [dbo].[examiner] ([e_id], [email], [name], [password], [phone]) VALUES (2, N'admin@gmail.com', N'admin', N'$2a$10$8eadAqz.TitRcFu4oSC.duc8PiDxwiQgKM4ydd3aEzRhhMyJ7c2Tu', N'8347207838')
GO
SET IDENTITY_INSERT [dbo].[examiner] OFF
GO
SET IDENTITY_INSERT [dbo].[mcq] ON 
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (8, N'C', N'logical', N'Berlin', N'Madrid', N'Paris', N'Rome', N'What is the capital of France?', N'Easy', 4)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (9, N'A', N'logical', N'Delhi', N'Ahmedabad', N'Mumbai', N'Kolkata', N'What is the capital of India?', N'Easy', 2)
GO
SET IDENTITY_INSERT [dbo].[mcq] OFF
GO
ALTER TABLE [dbo].[candidate_exam] ADD  DEFAULT (getdate()) FOR [started_at]
GO
ALTER TABLE [dbo].[candidate_exam] ADD  DEFAULT ('in-progress') FOR [status]
GO
ALTER TABLE [dbo].[candidate_mcq_answers] ADD  DEFAULT (getdate()) FOR [submitted_at]
GO
ALTER TABLE [dbo].[candidate_programming_answers] ADD  DEFAULT (getdate()) FOR [submitted_at]
GO
ALTER TABLE [dbo].[exam] ADD  DEFAULT ('MCQ') FOR [exam_type]
GO
ALTER TABLE [dbo].[mcq] ADD  DEFAULT ((1)) FOR [marks]
GO
ALTER TABLE [dbo].[candidate_exam]  WITH CHECK ADD FOREIGN KEY([candidate_id])
REFERENCES [dbo].[candidate] ([c_id])
GO
ALTER TABLE [dbo].[candidate_exam]  WITH CHECK ADD FOREIGN KEY([exam_id])
REFERENCES [dbo].[exam] ([exam_id])
GO
ALTER TABLE [dbo].[candidate_mcq_answers]  WITH CHECK ADD FOREIGN KEY([candidate_exam_id])
REFERENCES [dbo].[candidate_exam] ([candidate_exam_id])
GO
ALTER TABLE [dbo].[candidate_mcq_answers]  WITH CHECK ADD FOREIGN KEY([mcq_id])
REFERENCES [dbo].[mcq] ([id])
GO
ALTER TABLE [dbo].[candidate_programming_answers]  WITH CHECK ADD FOREIGN KEY([candidate_exam_id])
REFERENCES [dbo].[candidate_exam] ([candidate_exam_id])
GO
ALTER TABLE [dbo].[candidate_programming_answers]  WITH CHECK ADD FOREIGN KEY([programming_question_id])
REFERENCES [dbo].[programming_question] ([pq_id])
GO
ALTER TABLE [dbo].[exam]  WITH CHECK ADD FOREIGN KEY([examiner_id])
REFERENCES [dbo].[examiner] ([e_id])
GO
ALTER TABLE [dbo].[exam_programming_questions]  WITH CHECK ADD FOREIGN KEY([exam_id])
REFERENCES [dbo].[exam] ([exam_id])
GO
ALTER TABLE [dbo].[exam_programming_questions]  WITH CHECK ADD FOREIGN KEY([programming_question_id])
REFERENCES [dbo].[programming_question] ([pq_id])
GO
ALTER TABLE [dbo].[exam_questions]  WITH CHECK ADD FOREIGN KEY([exam_id])
REFERENCES [dbo].[exam] ([exam_id])
GO
ALTER TABLE [dbo].[exam_questions]  WITH CHECK ADD FOREIGN KEY([mcq_id])
REFERENCES [dbo].[mcq] ([id])
GO
