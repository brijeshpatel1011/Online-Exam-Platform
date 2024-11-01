USE [ExamDB1]
GO
/****** Object:  Table [dbo].[app_user]    Script Date: 01-11-2024 10:36:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[app_user](
	[user_id] [bigint] IDENTITY(1,1) NOT NULL,
	[email] [varchar](255) NULL,
	[enabled] [bit] NOT NULL,
	[password] [varchar](255) NULL,
	[role] [varchar](255) NULL,
	[username] [varchar](255) NULL,
	[role_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 01-11-2024 10:36:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[role_id] [int] NOT NULL,
	[role_name] [varchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[role_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[student_profile]    Script Date: 01-11-2024 10:36:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[student_profile](
	[student_id] [bigint] IDENTITY(1,1) NOT NULL,
	[student_id_code] [varchar](255) NULL,
	[student_name] [varchar](255) NULL,
	[user_id] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[student_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[app_user] ON 
GO
INSERT [dbo].[app_user] ([user_id], [email], [enabled], [password], [role], [username], [role_id]) VALUES (1, N'examiner1@example.com', 1, N'$2a$10$fb6jpWvk0Y1s7lEnPkfXoey.50q5G1W/smJpYnfkyVhl.SXAqJ8gi', N'EXAMINER', N'examiner1', NULL)
GO
INSERT [dbo].[app_user] ([user_id], [email], [enabled], [password], [role], [username], [role_id]) VALUES (2, N'examiner2@example.com', 0, N'$2a$10$ow5pBtuEV5JJte3aD2bcgedLDAxLoLd0KfuyRpFeJLQFb8jB3ECfq', N'EXAMINER', N'examiner2', NULL)
GO
INSERT [dbo].[app_user] ([user_id], [email], [enabled], [password], [role], [username], [role_id]) VALUES (3, N'examiner3@example.com', 1, N'$2a$10$Z4awpMlJRqJCzozjyuQVH.9cnN0p5B5h7N.TNtyprEoTAvZlkuU0.', N'EXAMINER', N'examiner3', NULL)
GO
SET IDENTITY_INSERT [dbo].[app_user] OFF
GO
INSERT [dbo].[Role] ([role_id], [role_name]) VALUES (1, N'EXAMINER')
GO
INSERT [dbo].[Role] ([role_id], [role_name]) VALUES (2, N'EXAMINEE')
GO
ALTER TABLE [dbo].[Role] ADD  DEFAULT ('Undefined') FOR [role_name]
GO
ALTER TABLE [dbo].[app_user]  WITH CHECK ADD  CONSTRAINT [FK49hx9nj6onfot1fxtonj986ab] FOREIGN KEY([role_id])
REFERENCES [dbo].[Role] ([role_id])
GO
ALTER TABLE [dbo].[app_user] CHECK CONSTRAINT [FK49hx9nj6onfot1fxtonj986ab]
GO
ALTER TABLE [dbo].[student_profile]  WITH CHECK ADD  CONSTRAINT [FKsx66sitpsdrm4srgkklo27na6] FOREIGN KEY([user_id])
REFERENCES [dbo].[app_user] ([user_id])
GO
ALTER TABLE [dbo].[student_profile] CHECK CONSTRAINT [FKsx66sitpsdrm4srgkklo27na6]
GO
ALTER TABLE [dbo].[app_user]  WITH CHECK ADD CHECK  (([role]='EXAMINEE' OR [role]='EXAMINER'))
GO
