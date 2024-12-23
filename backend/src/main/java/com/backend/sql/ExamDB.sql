USE [ExamDB]
GO
/****** Object:  Table [dbo].[candidate]    Script Date: 23-12-2024 15:53:53 ******/
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
/****** Object:  Table [dbo].[exam]    Script Date: 23-12-2024 15:53:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[exam](
	[exam_id] [int] IDENTITY(1,1) NOT NULL,
	[college] [varchar](200) NULL,
	[description] [varchar](255) NULL,
	[duration] [int] NOT NULL,
	[exam_end_date] [date] NULL,
	[exam_end_time] [time](7) NULL,
	[exam_start_date] [date] NULL,
	[exam_start_time] [time](7) NULL,
	[passing_score] [int] NULL,
	[title] [varchar](255) NOT NULL,
	[total_marks] [int] NULL,
	[total_questions] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[exam_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[exam_mcq]    Script Date: 23-12-2024 15:53:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[exam_mcq](
	[exam_id] [int] NOT NULL,
	[mcq_id] [bigint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[exam_id] ASC,
	[mcq_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[exam_programming_question]    Script Date: 23-12-2024 15:53:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[exam_programming_question](
	[exam_id] [int] NOT NULL,
	[programming_question_id] [bigint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[exam_id] ASC,
	[programming_question_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[exam_results]    Script Date: 23-12-2024 15:53:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[exam_results](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[correct_answers] [int] NOT NULL,
	[submitted_at] [datetime2](6) NOT NULL,
	[total_questions] [int] NOT NULL,
	[candidate_id] [bigint] NOT NULL,
	[exam_id] [int] NOT NULL,
	[mcq_score] [float] NOT NULL,
	[passed] [bit] NOT NULL,
	[programming_score] [float] NOT NULL,
	[total_score] [float] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[examiner]    Script Date: 23-12-2024 15:53:53 ******/
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
/****** Object:  Table [dbo].[mcq]    Script Date: 23-12-2024 15:53:53 ******/
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
/****** Object:  Table [dbo].[mcq_answers]    Script Date: 23-12-2024 15:53:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[mcq_answers](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[selected_option] [varchar](255) NOT NULL,
	[submitted_at] [datetime2](6) NOT NULL,
	[candidate_id] [bigint] NOT NULL,
	[exam_id] [int] NOT NULL,
	[question_id] [bigint] NOT NULL,
	[is_correct] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[programming_answers]    Script Date: 23-12-2024 15:53:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[programming_answers](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[solution_code] [text] NULL,
	[submitted_at] [datetime2](6) NOT NULL,
	[candidate_id] [bigint] NOT NULL,
	[exam_id] [int] NOT NULL,
	[question_id] [bigint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[programming_question]    Script Date: 23-12-2024 15:53:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[programming_question](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[constraints] [text] NULL,
	[description] [text] NULL,
	[difficulty] [varchar](50) NOT NULL,
	[input_format] [text] NULL,
	[marks] [int] NOT NULL,
	[output_format] [text] NULL,
	[sample_input] [text] NULL,
	[sample_output] [text] NULL,
	[title] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
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
SET IDENTITY_INSERT [dbo].[exam] ON 
GO
INSERT [dbo].[exam] ([exam_id], [college], [description], [duration], [exam_end_date], [exam_end_time], [exam_start_date], [exam_start_time], [passing_score], [title], [total_marks], [total_questions]) VALUES (13, N'BVM', N'Demo.', 120, CAST(N'2024-12-23' AS Date), CAST(N'15:59:00' AS Time), CAST(N'2024-12-23' AS Date), CAST(N'13:59:00' AS Time), 5, N'ExamUpdate', 17, 5)
GO
SET IDENTITY_INSERT [dbo].[exam] OFF
GO
INSERT [dbo].[exam_mcq] ([exam_id], [mcq_id]) VALUES (13, 13)
GO
INSERT [dbo].[exam_mcq] ([exam_id], [mcq_id]) VALUES (13, 31)
GO
INSERT [dbo].[exam_programming_question] ([exam_id], [programming_question_id]) VALUES (13, 1)
GO
INSERT [dbo].[exam_programming_question] ([exam_id], [programming_question_id]) VALUES (13, 2)
GO
INSERT [dbo].[exam_programming_question] ([exam_id], [programming_question_id]) VALUES (13, 3)
GO
SET IDENTITY_INSERT [dbo].[exam_results] ON 
GO
INSERT [dbo].[exam_results] ([id], [correct_answers], [submitted_at], [total_questions], [candidate_id], [exam_id], [mcq_score], [passed], [programming_score], [total_score]) VALUES (1, 0, CAST(N'2024-12-22T12:01:06.1060000' AS DateTime2), 5, 9, 13, 0, 0, 0, 0)
GO
INSERT [dbo].[exam_results] ([id], [correct_answers], [submitted_at], [total_questions], [candidate_id], [exam_id], [mcq_score], [passed], [programming_score], [total_score]) VALUES (2, 0, CAST(N'2024-12-22T12:03:47.4570000' AS DateTime2), 5, 9, 13, 0, 0, 0, 0)
GO
INSERT [dbo].[exam_results] ([id], [correct_answers], [submitted_at], [total_questions], [candidate_id], [exam_id], [mcq_score], [passed], [programming_score], [total_score]) VALUES (3, 0, CAST(N'2024-12-22T12:11:48.9550000' AS DateTime2), 5, 9, 13, 0, 0, 0, 0)
GO
INSERT [dbo].[exam_results] ([id], [correct_answers], [submitted_at], [total_questions], [candidate_id], [exam_id], [mcq_score], [passed], [programming_score], [total_score]) VALUES (4, 0, CAST(N'2024-12-23T10:00:20.9030000' AS DateTime2), 5, 9, 13, 0, 0, 0, 0)
GO
INSERT [dbo].[exam_results] ([id], [correct_answers], [submitted_at], [total_questions], [candidate_id], [exam_id], [mcq_score], [passed], [programming_score], [total_score]) VALUES (5, 0, CAST(N'2024-12-23T10:06:27.6470000' AS DateTime2), 5, 9, 13, 0, 0, 0, 0)
GO
INSERT [dbo].[exam_results] ([id], [correct_answers], [submitted_at], [total_questions], [candidate_id], [exam_id], [mcq_score], [passed], [programming_score], [total_score]) VALUES (6, 0, CAST(N'2024-12-23T10:09:27.6130000' AS DateTime2), 5, 9, 13, 0, 0, 0, 0)
GO
INSERT [dbo].[exam_results] ([id], [correct_answers], [submitted_at], [total_questions], [candidate_id], [exam_id], [mcq_score], [passed], [programming_score], [total_score]) VALUES (7, 0, CAST(N'2024-12-23T10:19:25.9320000' AS DateTime2), 5, 9, 13, 0, 0, 0, 0)
GO
INSERT [dbo].[exam_results] ([id], [correct_answers], [submitted_at], [total_questions], [candidate_id], [exam_id], [mcq_score], [passed], [programming_score], [total_score]) VALUES (8, 0, CAST(N'2024-12-23T10:26:37.3900000' AS DateTime2), 5, 9, 13, 0, 0, 0, 0)
GO
INSERT [dbo].[exam_results] ([id], [correct_answers], [submitted_at], [total_questions], [candidate_id], [exam_id], [mcq_score], [passed], [programming_score], [total_score]) VALUES (9, 0, CAST(N'2024-12-23T10:41:36.9060000' AS DateTime2), 5, 9, 13, 0, 0, 0, 0)
GO
INSERT [dbo].[exam_results] ([id], [correct_answers], [submitted_at], [total_questions], [candidate_id], [exam_id], [mcq_score], [passed], [programming_score], [total_score]) VALUES (10, 2, CAST(N'2024-12-23T10:48:43.8750000' AS DateTime2), 5, 9, 13, 100, 1, 0, 50)
GO
INSERT [dbo].[exam_results] ([id], [correct_answers], [submitted_at], [total_questions], [candidate_id], [exam_id], [mcq_score], [passed], [programming_score], [total_score]) VALUES (11, 0, CAST(N'2024-12-23T11:15:51.2680000' AS DateTime2), 5, 9, 13, 0, 0, 0, 0)
GO
INSERT [dbo].[exam_results] ([id], [correct_answers], [submitted_at], [total_questions], [candidate_id], [exam_id], [mcq_score], [passed], [programming_score], [total_score]) VALUES (12, 2, CAST(N'2024-12-23T11:38:01.5130000' AS DateTime2), 5, 9, 13, 100, 1, 0, 50)
GO
SET IDENTITY_INSERT [dbo].[exam_results] OFF
GO
SET IDENTITY_INSERT [dbo].[examiner] ON 
GO
INSERT [dbo].[examiner] ([e_id], [email], [name], [password], [phone]) VALUES (2, N'admin@gmail.com', N'admin', N'$2a$10$8eadAqz.TitRcFu4oSC.duc8PiDxwiQgKM4ydd3aEzRhhMyJ7c2Tu', N'8347207838')
GO
SET IDENTITY_INSERT [dbo].[examiner] OFF
GO
SET IDENTITY_INSERT [dbo].[mcq] ON 
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (12, N'C', N'Logical', N'1024 bytes', N'512 bytes', N'1 kilobyte', N'1 megabyte', N'What is the size of a kilobyte?', N'Easy', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (13, N'A', N'Logical', N'Binary', N'Hexadecimal', N'Decimal', N'Octal', N'What is the base of the binary number system?', N'Easy', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (14, N'D', N'Logical', N'Variable', N'Constant', N'Function', N'Algorithm', N'What is a step-by-step procedure to solve a problem called?', N'Medium', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (15, N'B', N'Logical', N'5', N'8', N'10', N'12', N'How many bits are in a byte?', N'Easy', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (16, N'C', N'Logical', N'10 Mbps', N'100 Mbps', N'1 Gbps', N'10 Gbps', N'What is the speed of a standard Gigabit Ethernet connection?', N'Medium', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (17, N'D', N'Technical', N'Operating System', N'Compiler', N'Database', N'Router', N'Which device is used to connect two networks?', N'Medium', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (18, N'A', N'Technical', N'TCP/IP', N'UDP/IP', N'FTP', N'HTTP', N'Which protocol is used for communication over the internet?', N'Medium', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (19, N'B', N'Technical', N'Windows', N'Linux', N'Unix', N'MacOS', N'Which operating system is open-source?', N'Easy', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (20, N'C', N'Technical', N'Hard Disk', N'RAM', N'SSD', N'ROM', N'Which type of storage is faster?', N'Medium', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (21, N'B', N'Technical', N'CPU', N'GPU', N'RAM', N'SSD', N'Which hardware component is specifically designed for rendering graphics?', N'Easy', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (22, N'C', N'Programming', N'Integer', N'String', N'Boolean', N'Float', N'Which data type is used for true/false values?', N'Easy', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (23, N'D', N'Programming', N'Static', N'Dynamic', N'Functional', N'Object-Oriented', N'What type of programming is Java primarily known for?', N'Medium', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (24, N'A', N'Programming', N'Python', N'C', N'JavaScript', N'Java', N'Which programming language is interpreted and commonly used in data science?', N'Medium', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (25, N'B', N'Programming', N'Switch', N'For', N'While', N'If', N'Which statement is used for looping in C programming?', N'Easy', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (26, N'A', N'Programming', N'Encapsulation', N'Inheritance', N'Polymorphism', N'Abstraction', N'Which concept hides implementation details in OOP?', N'Medium', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (27, N'C', N'Logical', N'HTML', N'CSS', N'JavaScript', N'Python', N'Which language is used to make web pages interactive?', N'Medium', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (28, N'A', N'Technical', N'DNS', N'IP', N'MAC Address', N'Subnet Mask', N'What translates domain names to IP addresses?', N'Medium', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (29, N'D', N'Logical', N'32-bit', N'16-bit', N'128-bit', N'64-bit', N'What is the word size of a 64-bit processor?', N'Easy', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (30, N'B', N'Programming', N'GitHub', N'Git', N'BitBucket', N'SourceForge', N'Which version control system uses commands like commit, push, pull?', N'Easy', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (31, N'C', N'Logical', N'Compile Time', N'Run Time', N'Both', N'None', N'When is polymorphism determined in Java?', N'Medium', 1)
GO
SET IDENTITY_INSERT [dbo].[mcq] OFF
GO
SET IDENTITY_INSERT [dbo].[mcq_answers] ON 
GO
INSERT [dbo].[mcq_answers] ([id], [selected_option], [submitted_at], [candidate_id], [exam_id], [question_id], [is_correct]) VALUES (1, N'Windows', CAST(N'2024-12-22T12:01:05.8310000' AS DateTime2), 9, 13, 19, 0)
GO
INSERT [dbo].[mcq_answers] ([id], [selected_option], [submitted_at], [candidate_id], [exam_id], [question_id], [is_correct]) VALUES (2, N'CSS', CAST(N'2024-12-22T12:01:05.9880000' AS DateTime2), 9, 13, 27, 0)
GO
INSERT [dbo].[mcq_answers] ([id], [selected_option], [submitted_at], [candidate_id], [exam_id], [question_id], [is_correct]) VALUES (3, N'Linux', CAST(N'2024-12-22T12:03:47.4220000' AS DateTime2), 9, 13, 19, 0)
GO
INSERT [dbo].[mcq_answers] ([id], [selected_option], [submitted_at], [candidate_id], [exam_id], [question_id], [is_correct]) VALUES (4, N'JavaScript', CAST(N'2024-12-22T12:03:47.4350000' AS DateTime2), 9, 13, 27, 0)
GO
INSERT [dbo].[mcq_answers] ([id], [selected_option], [submitted_at], [candidate_id], [exam_id], [question_id], [is_correct]) VALUES (5, N'Linux', CAST(N'2024-12-22T12:11:48.9260000' AS DateTime2), 9, 13, 19, 0)
GO
INSERT [dbo].[mcq_answers] ([id], [selected_option], [submitted_at], [candidate_id], [exam_id], [question_id], [is_correct]) VALUES (6, N'JavaScript', CAST(N'2024-12-22T12:11:48.9360000' AS DateTime2), 9, 13, 27, 0)
GO
INSERT [dbo].[mcq_answers] ([id], [selected_option], [submitted_at], [candidate_id], [exam_id], [question_id], [is_correct]) VALUES (7, N'Boolean', CAST(N'2024-12-23T10:00:20.7870000' AS DateTime2), 9, 13, 22, 0)
GO
INSERT [dbo].[mcq_answers] ([id], [selected_option], [submitted_at], [candidate_id], [exam_id], [question_id], [is_correct]) VALUES (8, N'JavaScript', CAST(N'2024-12-23T10:00:20.8560000' AS DateTime2), 9, 13, 27, 0)
GO
INSERT [dbo].[mcq_answers] ([id], [selected_option], [submitted_at], [candidate_id], [exam_id], [question_id], [is_correct]) VALUES (9, N'Boolean', CAST(N'2024-12-23T10:06:27.6080000' AS DateTime2), 9, 13, 22, 0)
GO
INSERT [dbo].[mcq_answers] ([id], [selected_option], [submitted_at], [candidate_id], [exam_id], [question_id], [is_correct]) VALUES (10, N'JavaScript', CAST(N'2024-12-23T10:06:27.6240000' AS DateTime2), 9, 13, 27, 0)
GO
INSERT [dbo].[mcq_answers] ([id], [selected_option], [submitted_at], [candidate_id], [exam_id], [question_id], [is_correct]) VALUES (11, N'Boolean', CAST(N'2024-12-23T10:09:27.5790000' AS DateTime2), 9, 13, 22, 0)
GO
INSERT [dbo].[mcq_answers] ([id], [selected_option], [submitted_at], [candidate_id], [exam_id], [question_id], [is_correct]) VALUES (12, N'JavaScript', CAST(N'2024-12-23T10:09:27.5900000' AS DateTime2), 9, 13, 27, 0)
GO
INSERT [dbo].[mcq_answers] ([id], [selected_option], [submitted_at], [candidate_id], [exam_id], [question_id], [is_correct]) VALUES (13, N'Boolean', CAST(N'2024-12-23T10:19:25.9000000' AS DateTime2), 9, 13, 22, 0)
GO
INSERT [dbo].[mcq_answers] ([id], [selected_option], [submitted_at], [candidate_id], [exam_id], [question_id], [is_correct]) VALUES (14, N'JavaScript', CAST(N'2024-12-23T10:19:25.9090000' AS DateTime2), 9, 13, 27, 0)
GO
INSERT [dbo].[mcq_answers] ([id], [selected_option], [submitted_at], [candidate_id], [exam_id], [question_id], [is_correct]) VALUES (15, N'Boolean', CAST(N'2024-12-23T10:26:37.3540000' AS DateTime2), 9, 13, 22, 0)
GO
INSERT [dbo].[mcq_answers] ([id], [selected_option], [submitted_at], [candidate_id], [exam_id], [question_id], [is_correct]) VALUES (16, N'JavaScript', CAST(N'2024-12-23T10:26:37.3670000' AS DateTime2), 9, 13, 27, 0)
GO
INSERT [dbo].[mcq_answers] ([id], [selected_option], [submitted_at], [candidate_id], [exam_id], [question_id], [is_correct]) VALUES (17, N'Boolean', CAST(N'2024-12-23T10:41:36.8630000' AS DateTime2), 9, 13, 22, 0)
GO
INSERT [dbo].[mcq_answers] ([id], [selected_option], [submitted_at], [candidate_id], [exam_id], [question_id], [is_correct]) VALUES (18, N'JavaScript', CAST(N'2024-12-23T10:41:36.8730000' AS DateTime2), 9, 13, 27, 0)
GO
INSERT [dbo].[mcq_answers] ([id], [selected_option], [submitted_at], [candidate_id], [exam_id], [question_id], [is_correct]) VALUES (19, N'A', CAST(N'2024-12-23T10:48:43.8400000' AS DateTime2), 9, 13, 24, 1)
GO
INSERT [dbo].[mcq_answers] ([id], [selected_option], [submitted_at], [candidate_id], [exam_id], [question_id], [is_correct]) VALUES (20, N'B', CAST(N'2024-12-23T10:48:43.8480000' AS DateTime2), 9, 13, 30, 1)
GO
INSERT [dbo].[mcq_answers] ([id], [selected_option], [submitted_at], [candidate_id], [exam_id], [question_id], [is_correct]) VALUES (21, N'Boolean', CAST(N'2024-12-23T11:15:51.2340000' AS DateTime2), 9, 13, 22, 0)
GO
INSERT [dbo].[mcq_answers] ([id], [selected_option], [submitted_at], [candidate_id], [exam_id], [question_id], [is_correct]) VALUES (22, N'JavaScript', CAST(N'2024-12-23T11:15:51.2450000' AS DateTime2), 9, 13, 27, 0)
GO
INSERT [dbo].[mcq_answers] ([id], [selected_option], [submitted_at], [candidate_id], [exam_id], [question_id], [is_correct]) VALUES (23, N'C', CAST(N'2024-12-23T11:38:01.4500000' AS DateTime2), 9, 13, 22, 1)
GO
INSERT [dbo].[mcq_answers] ([id], [selected_option], [submitted_at], [candidate_id], [exam_id], [question_id], [is_correct]) VALUES (24, N'C', CAST(N'2024-12-23T11:38:01.4590000' AS DateTime2), 9, 13, 27, 1)
GO
SET IDENTITY_INSERT [dbo].[mcq_answers] OFF
GO
SET IDENTITY_INSERT [dbo].[programming_answers] ON 
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (1, N'dfveger', CAST(N'2024-12-22T12:01:06.0030000' AS DateTime2), 9, 13, 1)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (2, N'sverger', CAST(N'2024-12-22T12:01:06.0970000' AS DateTime2), 9, 13, 2)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (3, N'svcsgerg', CAST(N'2024-12-22T12:01:06.1030000' AS DateTime2), 9, 13, 3)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (4, N'SCsdfwrg', CAST(N'2024-12-22T12:03:47.4410000' AS DateTime2), 9, 13, 1)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (5, N'svsdgrg', CAST(N'2024-12-22T12:03:47.4490000' AS DateTime2), 9, 13, 2)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (6, N'x dcvf', CAST(N'2024-12-22T12:03:47.4540000' AS DateTime2), 9, 13, 3)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (7, N'zcsdcdegerg', CAST(N'2024-12-22T12:11:48.9410000' AS DateTime2), 9, 13, 1)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (8, N'wefergergef', CAST(N'2024-12-22T12:11:48.9490000' AS DateTime2), 9, 13, 2)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (9, N'fwferwgfr', CAST(N'2024-12-22T12:11:48.9530000' AS DateTime2), 9, 13, 3)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (10, N'hhhhhhh', CAST(N'2024-12-23T10:00:20.8710000' AS DateTime2), 9, 13, 1)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (11, N'hhhhh', CAST(N'2024-12-23T10:00:20.8940000' AS DateTime2), 9, 13, 2)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (12, N'hhhhhh', CAST(N'2024-12-23T10:00:20.9000000' AS DateTime2), 9, 13, 3)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (13, N'iiiii', CAST(N'2024-12-23T10:06:27.6300000' AS DateTime2), 9, 13, 1)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (14, N'iiii', CAST(N'2024-12-23T10:06:27.6400000' AS DateTime2), 9, 13, 2)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (15, N'i', CAST(N'2024-12-23T10:06:27.6440000' AS DateTime2), 9, 13, 3)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (16, N'yy', CAST(N'2024-12-23T10:09:27.5980000' AS DateTime2), 9, 13, 1)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (17, N'yy', CAST(N'2024-12-23T10:09:27.6050000' AS DateTime2), 9, 13, 2)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (18, N'yyy', CAST(N'2024-12-23T10:09:27.6110000' AS DateTime2), 9, 13, 3)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (19, N'aa', CAST(N'2024-12-23T10:19:25.9160000' AS DateTime2), 9, 13, 1)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (20, N'aa', CAST(N'2024-12-23T10:19:25.9250000' AS DateTime2), 9, 13, 2)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (21, N'aa', CAST(N'2024-12-23T10:19:25.9300000' AS DateTime2), 9, 13, 3)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (22, N'sss', CAST(N'2024-12-23T10:26:37.3740000' AS DateTime2), 9, 13, 1)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (23, N's', CAST(N'2024-12-23T10:26:37.3820000' AS DateTime2), 9, 13, 2)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (24, N's', CAST(N'2024-12-23T10:26:37.3870000' AS DateTime2), 9, 13, 3)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (25, N'lll', CAST(N'2024-12-23T10:41:36.8840000' AS DateTime2), 9, 13, 1)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (26, N'll', CAST(N'2024-12-23T10:41:36.8960000' AS DateTime2), 9, 13, 2)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (27, N'llllll', CAST(N'2024-12-23T10:41:36.9010000' AS DateTime2), 9, 13, 3)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (28, N'public class Solution {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}', CAST(N'2024-12-23T10:48:43.8570000' AS DateTime2), 9, 13, 1)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (29, N'public class Solution {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}', CAST(N'2024-12-23T10:48:43.8650000' AS DateTime2), 9, 13, 2)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (30, N'public class Solution {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}', CAST(N'2024-12-23T10:48:43.8730000' AS DateTime2), 9, 13, 3)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (31, N'bb', CAST(N'2024-12-23T11:15:51.2530000' AS DateTime2), 9, 13, 1)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (32, N'b', CAST(N'2024-12-23T11:15:51.2610000' AS DateTime2), 9, 13, 2)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (33, N'b', CAST(N'2024-12-23T11:15:51.2650000' AS DateTime2), 9, 13, 3)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (34, N'gg', CAST(N'2024-12-23T11:38:01.4650000' AS DateTime2), 9, 13, 1)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (35, N'g', CAST(N'2024-12-23T11:38:01.5070000' AS DateTime2), 9, 13, 2)
GO
INSERT [dbo].[programming_answers] ([id], [solution_code], [submitted_at], [candidate_id], [exam_id], [question_id]) VALUES (36, N'g', CAST(N'2024-12-23T11:38:01.5120000' AS DateTime2), 9, 13, 3)
GO
SET IDENTITY_INSERT [dbo].[programming_answers] OFF
GO
SET IDENTITY_INSERT [dbo].[programming_question] ON 
GO
INSERT [dbo].[programming_question] ([id], [constraints], [description], [difficulty], [input_format], [marks], [output_format], [sample_input], [sample_output], [title]) VALUES (1, N'1 <= n <= 20', N'Write a program to compute the factorial of a given non-negative integer n. Factorial of n (n!) is the product of all positive integers less than or equal to n.', N'Easy', N'Input: A single integer n', 5, N'Output: A single integer representing n!', N'5', N'120', N'Find Factorial of a Number')
GO
INSERT [dbo].[programming_question] ([id], [constraints], [description], [difficulty], [input_format], [marks], [output_format], [sample_input], [sample_output], [title]) VALUES (2, N'The string will contain only alphanumeric characters and have a maximum length of 100.', N'Write a program to check if the given string is a palindrome. A palindrome is a word, phrase, or sequence that reads the same backward as forward.', N'Medium', N'Input: A single string', 5, N'Output: "YES" if the string is a palindrome, otherwise "NO"', N'madam', N'YES', N'Check Palindrome String')
GO
INSERT [dbo].[programming_question] ([id], [constraints], [description], [difficulty], [input_format], [marks], [output_format], [sample_input], [sample_output], [title]) VALUES (3, N'1 <= n <= 50', N'Write a program to generate the first n numbers of the Fibonacci sequence. The Fibonacci sequence is defined as: F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2) for n > 1.', N'Hard', N'Input: A single integer n', 5, N'Output: The first n Fibonacci numbers separated by spaces', N'7', N'0 1 1 2 3 5 8', N'Generate Fibonacci Sequence')
GO
SET IDENTITY_INSERT [dbo].[programming_question] OFF
GO
ALTER TABLE [dbo].[mcq] ADD  DEFAULT ((1)) FOR [marks]
GO
ALTER TABLE [dbo].[exam_mcq]  WITH CHECK ADD  CONSTRAINT [FK77x0qhl184755pktctqobbpoj] FOREIGN KEY([mcq_id])
REFERENCES [dbo].[mcq] ([id])
GO
ALTER TABLE [dbo].[exam_mcq] CHECK CONSTRAINT [FK77x0qhl184755pktctqobbpoj]
GO
ALTER TABLE [dbo].[exam_mcq]  WITH CHECK ADD  CONSTRAINT [FKg6115v55ag87qu9l47vrw3618] FOREIGN KEY([exam_id])
REFERENCES [dbo].[exam] ([exam_id])
GO
ALTER TABLE [dbo].[exam_mcq] CHECK CONSTRAINT [FKg6115v55ag87qu9l47vrw3618]
GO
ALTER TABLE [dbo].[exam_programming_question]  WITH CHECK ADD  CONSTRAINT [FKjptvv070mqdk39k5jl3u7dx0x] FOREIGN KEY([programming_question_id])
REFERENCES [dbo].[programming_question] ([id])
GO
ALTER TABLE [dbo].[exam_programming_question] CHECK CONSTRAINT [FKjptvv070mqdk39k5jl3u7dx0x]
GO
ALTER TABLE [dbo].[exam_programming_question]  WITH CHECK ADD  CONSTRAINT [FKqk6eeko9tcf04kkgsk1we8bj9] FOREIGN KEY([exam_id])
REFERENCES [dbo].[exam] ([exam_id])
GO
ALTER TABLE [dbo].[exam_programming_question] CHECK CONSTRAINT [FKqk6eeko9tcf04kkgsk1we8bj9]
GO
ALTER TABLE [dbo].[exam_results]  WITH CHECK ADD  CONSTRAINT [FKbxajm38ivmgk100y0jbel6i7r] FOREIGN KEY([candidate_id])
REFERENCES [dbo].[candidate] ([c_id])
GO
ALTER TABLE [dbo].[exam_results] CHECK CONSTRAINT [FKbxajm38ivmgk100y0jbel6i7r]
GO
ALTER TABLE [dbo].[exam_results]  WITH CHECK ADD  CONSTRAINT [FKgpb0xaxltlrcdpmcvggxah0me] FOREIGN KEY([exam_id])
REFERENCES [dbo].[exam] ([exam_id])
GO
ALTER TABLE [dbo].[exam_results] CHECK CONSTRAINT [FKgpb0xaxltlrcdpmcvggxah0me]
GO
ALTER TABLE [dbo].[mcq_answers]  WITH CHECK ADD  CONSTRAINT [FK2me1bj8vdxypm638u25clk72h] FOREIGN KEY([question_id])
REFERENCES [dbo].[mcq] ([id])
GO
ALTER TABLE [dbo].[mcq_answers] CHECK CONSTRAINT [FK2me1bj8vdxypm638u25clk72h]
GO
ALTER TABLE [dbo].[mcq_answers]  WITH CHECK ADD  CONSTRAINT [FK9mrsc2kfc3p281nm2mia1p1y] FOREIGN KEY([exam_id])
REFERENCES [dbo].[exam] ([exam_id])
GO
ALTER TABLE [dbo].[mcq_answers] CHECK CONSTRAINT [FK9mrsc2kfc3p281nm2mia1p1y]
GO
ALTER TABLE [dbo].[mcq_answers]  WITH CHECK ADD  CONSTRAINT [FKm8mt0pntgadc8fythjs0vj3ay] FOREIGN KEY([candidate_id])
REFERENCES [dbo].[candidate] ([c_id])
GO
ALTER TABLE [dbo].[mcq_answers] CHECK CONSTRAINT [FKm8mt0pntgadc8fythjs0vj3ay]
GO
ALTER TABLE [dbo].[programming_answers]  WITH CHECK ADD  CONSTRAINT [FK67syu6a33fpuymu4j3qjg35wx] FOREIGN KEY([question_id])
REFERENCES [dbo].[programming_question] ([id])
GO
ALTER TABLE [dbo].[programming_answers] CHECK CONSTRAINT [FK67syu6a33fpuymu4j3qjg35wx]
GO
ALTER TABLE [dbo].[programming_answers]  WITH CHECK ADD  CONSTRAINT [FK8hu8xmg9m0qr36f2oyf4l4qsk] FOREIGN KEY([exam_id])
REFERENCES [dbo].[exam] ([exam_id])
GO
ALTER TABLE [dbo].[programming_answers] CHECK CONSTRAINT [FK8hu8xmg9m0qr36f2oyf4l4qsk]
GO
ALTER TABLE [dbo].[programming_answers]  WITH CHECK ADD  CONSTRAINT [FKi3wfnm89itml2pswlaf3v4yyk] FOREIGN KEY([candidate_id])
REFERENCES [dbo].[candidate] ([c_id])
GO
ALTER TABLE [dbo].[programming_answers] CHECK CONSTRAINT [FKi3wfnm89itml2pswlaf3v4yyk]
GO
